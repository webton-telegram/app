import { useState, useMemo } from 'react';
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

import cards from 'data/card';
import selectedList from 'data/selectedBox';

const Recommended = () => {
  const [selectedKeys, setSelectedKeys] = useState(
    new Set([selectedList[0].key]),
  );

  const selectedText = useMemo(
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
      <div className="grid grid-cols-3 gap-4 pb-4">
        {cards.map((card) => (
          <Card key={`card-${card.title}`} {...card} />
        ))}
      </div>
    </LayoutContainer>
  );
};

export default Recommended;
