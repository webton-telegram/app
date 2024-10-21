import { Listbox, ListboxItem } from '@nextui-org/react';
import { FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import LayoutContainer from 'components/layout/LayoutContainer';

type Key = string | number;

type ListItem = {
  key: Key;
  text: string;
  link: string;
};

const list: ListItem[] = [
  {
    key: 'recently',
    text: 'Recently Viewed Posts',
    link: '/profile/recently',
  },
  {
    key: 'recommended',
    text: 'Recommended Posts',
    link: '/profile/recommended',
  },
];

const Profile = () => {
  const navigate = useNavigate();

  const handleAction = (key: Key) => {
    const find = list.find((item) => item.key === key);
    if (!find) return;

    navigate(find.link);
  };

  return (
    <LayoutContainer>
      <div className="py-4">
        <Listbox aria-label="Actions" onAction={handleAction}>
          {list.map((item) => (
            <ListboxItem
              key={item.key}
              color="primary"
              endContent={<FaChevronRight size={20} />}
            >
              <p className="text-xl">{item.text}</p>
            </ListboxItem>
          ))}
        </Listbox>
      </div>
    </LayoutContainer>
  );
};

export default Profile;
