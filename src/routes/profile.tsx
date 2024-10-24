import { useState } from 'react';
import { Listbox, ListboxItem } from '@nextui-org/react';
import { FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns/format';
import WebApp from '@twa-dev/sdk';

import useTelegramAuth from 'hooks/useTelegramAuth';

import LayoutContainer from 'components/layout/LayoutContainer';
import ThemeControlSwitch from 'components/ThemeControlSwitch';

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
  const [count, setCount] = useState(0);
  const { isTelegramView, telegramAuthData } = useTelegramAuth();

  const navigate = useNavigate();

  const handleAction = (key: Key) => {
    const find = list.find((item) => item.key === key);
    if (!find) return;

    navigate(find.link);
  };

  return (
    <LayoutContainer>
      <div className="py-4">
        <div className="card">
          <button onClick={() => setCount((prevState) => prevState + 1)}>
            count is {count}
          </button>
        </div>
        <div className="card">
          <button
            onClick={() =>
              WebApp.showAlert(`Hello World! Current count is ${count}`)
            }
          >
            Show Alert
          </button>
        </div>
        <ThemeControlSwitch />
        {isTelegramView && telegramAuthData.user && (
          <div className="flex flex-col gap-1 px-3 mb-4 text-xs overflow-hidden break-all">
            <div className="grid grid-cols-2">
              <p>id: {telegramAuthData.user.id}</p>
              <p>firstName: {telegramAuthData.user.firstName}</p>
              <p>lastName: {telegramAuthData.user.lastName}</p>
              <p>username: {telegramAuthData.user.username}</p>
              <p>languageCode: {telegramAuthData.user.languageCode}</p>
              <p>isPremium: {telegramAuthData.user.isPremium?.toString()}</p>
              <p>
                allowsWriteToPm:{' '}
                {telegramAuthData.user.allowsWriteToPm?.toString()}
              </p>
            </div>
            {telegramAuthData.authDate && (
              <p>authDate: {format(telegramAuthData.authDate, 'dd/MM/yyyy')}</p>
            )}
            <p>startParam: {telegramAuthData.startParam}</p>
            <p>chatType: {telegramAuthData.chatType}</p>
            <p>chatInstance: {telegramAuthData.chatInstance}</p>
            <p>hash: {telegramAuthData.hash}</p>
          </div>
        )}

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
