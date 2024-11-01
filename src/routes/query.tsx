import { useState, ChangeEvent, useMemo } from 'react';
import { Input } from '@nextui-org/react';
import { IoMdClose } from 'react-icons/io';
import { useDebounce } from 'react-use';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

import Card from 'components/Card';
import LayoutContainer from 'components/layout/LayoutContainer';

import cards from 'data/card';

const Query = () => {
  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState(input);

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const clearInput = () => {
    setInput('');
  };

  const handleNavigate = () => {
    navigate('/profile/recommended');
  };

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
        <div className="relative z-0 grid grid-cols-3 gap-2 pb-4">
          {filteredCards.map((card) => (
            <Card key={`card-${card.title}`} {...card} />
          ))}
        </div>
      )}

      {debouncedInput && filteredCards.length === 0 && (
        <div className="flex justify-center items-center min-h-[85vh]">
          <p>No results found for your search.</p>
        </div>
      )}
    </LayoutContainer>
  );
};

export default Query;
