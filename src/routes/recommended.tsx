import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  SharedSelection,
} from '@nextui-org/react';

import Card from 'components/Card';
import LayoutContainer from 'components/layout/LayoutContainer';
import PageTitle from 'components/PageTitle';

type SelectedItem = {
  key: string;
  text: string;
};

const selectedList: SelectedItem[] = [
  {
    key: 'all',
    text: 'All',
  },
  {
    key: 'today',
    text: 'Today',
  },
  {
    key: 'last7',
    text: 'Last 7 Days',
  },
  {
    key: 'last14',
    text: 'Last 14 Days',
  },
  {
    key: 'last30',
    text: 'Last 30 Days',
  },
  {
    key: 'last90',
    text: 'Last 90 Days',
  },
];

const Recommended = () => {
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set([selectedList[0].key]),
  );

  const selectedText = React.useMemo(
    () =>
      selectedList.find(
        (item) =>
          item.key === Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
      )?.text,
    [selectedKeys],
  );

  const handleSelectionChange = (key: SharedSelection) => {
    if (!key.currentKey) return;
    setSelectedKeys(new Set([key.currentKey]));
  };

  return (
    <LayoutContainer>
      <div className="sticky top-0 py-4 bg-white dark:bg-neutral-900">
        <PageTitle
          endContent={
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" className="capitalize">
                  {selectedText}
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
                  <DropdownItem key={item.key} color="primary">
                    {item.text}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          }
        >
          Recommended Posts
        </PageTitle>
      </div>
      <div className="grid grid-cols-2 gap-4 pb-4">
        {new Array(20).fill(0).map((idx) => (
          <Card key={`card-${idx}`} />
        ))}
      </div>
    </LayoutContainer>
  );
};

export default Recommended;
