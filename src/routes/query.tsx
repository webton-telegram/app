import {
  useState,
  ChangeEvent,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { Input, Skeleton } from '@nextui-org/react';
import { IoMdClose } from 'react-icons/io';
import { useDebounce } from 'react-use';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import { useInfiniteQuery } from '@tanstack/react-query';

import type { RequestToonListParams, ToonListData } from 'types/toon';

import Card from 'components/Card';
import Card2 from 'components/Card2';
import LayoutContainer from 'components/layout/LayoutContainer';

import cards from 'data/card';
import { getToonList } from 'service/api/toon';

interface FetchPageResult {
  data: ToonListData;
}

const LIMIT = 9;
const ERROR_MESSAGE = 'A system error occurred. Please try again later.';

const Query = () => {
  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState(input);

  const observerTarget = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useDebounce(
    () => {
      setDebouncedInput(input.trim());
    },
    300,
    [input],
  );

  const filteredCards = useMemo(
    () =>
      cards.filter((card) =>
        card.title.toLowerCase().includes(debouncedInput.toLowerCase()),
      ),
    [debouncedInput],
  );

  const fetchPage = useCallback(
    async (pageParam: string): Promise<FetchPageResult> => {
      const data = await getToonList({
        page: pageParam ? Number(pageParam) - 1 : 0,
        limit: LIMIT,
        orderBy: 'popular',
        sort: 'DESC',
        searchText: debouncedInput,
      } as RequestToonListParams);

      return { data };
    },
    [debouncedInput],
  );

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<FetchPageResult, Error>({
    queryKey: ['query'],
    queryFn: ({ pageParam }) => fetchPage(pageParam as string),
    initialPageParam: '',
    getNextPageParam: (lastPage, pages) => {
      if (pages.length * LIMIT > lastPage.data.total) return undefined;
      return pages.length + 1;
    },
    enabled: !!debouncedInput,
  });

  const items = useMemo(
    () => data?.pages.flatMap((page) => page.data.list) ?? [],
    [data?.pages],
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const clearInput = () => {
    setInput('');
  };

  const handleNavigate = () => {
    navigate('/profile/recommended');
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(observerTarget.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <LayoutContainer>
      <div className="sticky top-0 z-10 py-4 flex items-center space-x-4 bg-white dark:bg-neutral-900">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Search for post"
          fullWidth
          endContent={input && <IoMdClose onClick={clearInput} />}
        />
      </div>

      {!debouncedInput && (
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg">Recommend</h2>
            <button
              className="flex justify-center items-center gap-1 text-default-500 text-sm"
              onClick={handleNavigate}
            >
              More <FaChevronRight size={12} />
            </button>
          </div>

          <div className="relative z-0 grid grid-cols-3 gap-2 pb-4">
            {cards.slice(0, 6).map((card) => (
              <Card key={`recommend-${card.title}`} {...card} />
            ))}
          </div>
        </div>
      )}

      {debouncedInput && filteredCards.length > 0 && (
        <>
          {isError ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <p>{ERROR_MESSAGE}</p>
            </div>
          ) : (
            <div className="relative z-0 grid grid-cols-3 gap-2">
              {isLoading
                ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => (
                    <div
                      key={`skeleton-${idx}`}
                      className="aspect-[1/2] w-full"
                    >
                      <Skeleton className="w-full h-full rounded-lg" />
                    </div>
                  ))
                : items.map((card) => (
                    <Card2 key={`card-${card.id}`} {...card} />
                  ))}
            </div>
          )}
          <div ref={observerTarget} />
        </>
      )}

      {debouncedInput && items.length === 0 && (
        <div className="flex justify-center items-center min-h-[85vh]">
          <p>No results found for your search.</p>
        </div>
      )}
    </LayoutContainer>
  );
};

export default Query;
