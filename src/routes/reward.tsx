import { useState, useMemo } from 'react';
import {
  Button,
  Card,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  SharedSelection,
} from '@nextui-org/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/table';
import { IoSwapHorizontal } from 'react-icons/io5';
import { IoIosArrowBack } from 'react-icons/io';

import LayoutContainer from 'components/layout/LayoutContainer';

import { cn } from 'lib/utils';

type TableItem = {
  rank: number;
  name: string;
  score: number;
};

const tableList: TableItem[] = [
  {
    rank: 254,
    name: 'You (MJ)',
    score: 102.32,
  },
  {
    rank: 1,
    name: 'Jamie',
    score: 767.033,
  },
  {
    rank: 2,
    name: 'Ella',
    score: 707.853,
  },
  {
    rank: 3,
    name: 'Sarah',
    score: 700.412,
  },
  {
    rank: 4,
    name: 'Anna',
    score: 694.974,
  },
  {
    rank: 5,
    name: 'Emma',
    score: 627.055,
  },
  {
    rank: 6,
    name: 'Avery',
    score: 619.809,
  },
  {
    rank: 7,
    name: 'Logan',
    score: 607.659,
  },
  {
    rank: 8,
    name: 'Ethan',
    score: 582.494,
  },
  {
    rank: 9,
    name: 'Sophia',
    score: 543.341,
  },
  {
    rank: 10,
    name: 'Liam',
    score: 531.896,
  },
];

const selectedList = [
  {
    key: 'Season3',
    text: 'Season 3 (In Progress)',
    text2: 'Season 3',
    endDate: '2025.09.20 06:00:00',
    status: 'progress',
  },
  {
    key: 'Season2',
    text: 'Season 2 (Ended)',
    text2: 'Season 2',
    endDate: '2024.09.20 06:00:00',
    status: 'end',
  },
  {
    key: 'Season1',
    text: 'Season 1 (Ended)',
    text2: 'Season 1',
    endDate: '2023.09.20 06:00:00',
    status: 'end',
  },
];

const Reward = () => {
  const [selectedKeys, setSelectedKeys] = useState(
    new Set([selectedList[0].key]),
  );

  const selectedSeason = useMemo(
    () =>
      selectedList.find(
        (item) =>
          item.key === Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
      ),
    [selectedKeys],
  );

  const handleSelectionChange = (key: SharedSelection) => {
    if (!key.currentKey) return;
    setSelectedKeys(new Set([key.currentKey]));
  };

  return (
    <LayoutContainer>
      <div className="py-4 space-y-6">
        <Card className="p-4 text-center">
          <div className="flex flex-col gap-1">
            <p className="text-xl">
              Enjoy a variety of{' '}
              <span className="text-primary font-semibold">WebTon</span> works!
            </p>
            <p className="text-sm text-gray-400">
              Convert points to tokens at the end of the season to enjoy special
              benefits!
            </p>
          </div>
          <p className="mt-2 text-2xl font-bold">POINT: 638.532</p>
          <div className="flex justify-center space-x-4 mt-4">
            <Button>Learn more</Button>
            <Button color="primary">
              <IoSwapHorizontal />
              Token
            </Button>
          </div>
        </Card>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="capitalize"
                  size="sm"
                  color={
                    selectedSeason?.status === 'progress'
                      ? 'success'
                      : 'default'
                  }
                >
                  {selectedSeason?.text2}
                  <IoIosArrowBack
                    size={16}
                    className="rotate-[270deg] text-2xl"
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={handleSelectionChange}
              >
                {selectedList.map((item) => (
                  <DropdownItem
                    key={item.key}
                    color={
                      selectedSeason?.status === 'progress'
                        ? 'success'
                        : 'default'
                    }
                  >
                    <span
                      className={cn(
                        item?.status === 'progress' && 'text-green-500',
                      )}
                    >
                      {item.text}
                    </span>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <p className="text-sm">Ends in {selectedSeason?.endDate}</p>
          </div>
          <Table aria-label="Ranking Table" className="h-auto min-w-[100%]">
            <TableHeader>
              <TableColumn>Ranking</TableColumn>
              <TableColumn>Name</TableColumn>
              <TableColumn>Score</TableColumn>
            </TableHeader>
            <TableBody>
              {tableList.map((item, idx) => (
                <TableRow
                  key={`${item.rank}-${item.name}`}
                  className={cn(idx === 0 && 'bg-gray-800')}
                >
                  <TableCell className={cn(idx === 0 && 'rounded-s-lg')}>
                    {item.rank}
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className={cn(idx === 0 && 'rounded-e-lg')}>
                    {item.score}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end">
            <Button variant="ghost">
              Learn more{' '}
              <IoIosArrowBack size={16} className="rotate-180 text-2xl" />
            </Button>
          </div>
        </div>

        <Card className="p-4 space-y-2">
          <p className="text-lg font-bold">About Reward</p>
          <p className="text-sm">1. Enjoy WebToon works.</p>
          <p className="text-sm">
            2. Based on the accumulated Score, points will be awarded according
            to the final ranking at the end of the season.
          </p>
          <p className="text-sm">
            3. Points can be converted to tokens for use.
          </p>
        </Card>
      </div>
    </LayoutContainer>
  );
};

export default Reward;
