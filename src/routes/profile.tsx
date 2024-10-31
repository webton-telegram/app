import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Listbox,
  ListboxItem,
  Skeleton,
} from '@nextui-org/react';
import { FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import useTelegramAuth from 'hooks/useTelegramAuth';

import LayoutContainer from 'components/layout/LayoutContainer';
import {
  useIsConnectionRestored,
  useTonAddress,
  useTonConnectUI,
} from '@tonconnect/ui-react';
import useTonAddressInfo from 'hooks/useTonAddressInfo';
import { shortenAddress } from 'lib/utils';

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
  const { isTelegramView, telegramAuthData } = useTelegramAuth();
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();

  const connectionRestored = useIsConnectionRestored();

  const { addressInfo } = useTonAddressInfo();

  const handleConnect = async () => {
    await tonConnectUI.openModal();
  };

  const navigate = useNavigate();

  const handleAction = (key: Key) => {
    const find = list.find((item) => item.key === key);
    if (!find) return;

    navigate(find.link);
  };

  return (
    <LayoutContainer>
      <div className="flex flex-col gap-4 py-4">
        {isTelegramView && telegramAuthData.user && (
          <Card shadow="sm">
            <CardHeader className="flex items-center gap-3">
              <div>
                <Avatar
                  name={telegramAuthData.user.firstName[0].toUpperCase()}
                />
              </div>
              <div className="flex flex-col">
                <p className="text-small text-default-500">
                  @{telegramAuthData.user.username}
                </p>
                <p>{0} Point</p>
              </div>
            </CardHeader>
            <CardBody>
              {!connectionRestored && (
                <Skeleton className="w-full h-10 rounded-xl" />
              )}

              {connectionRestored && tonConnectUI.connected && (
                <Button color="success">Get Reward</Button>
              )}

              {connectionRestored && !tonConnectUI.connected && (
                <Button onClick={handleConnect}>Connect wallet</Button>
              )}
            </CardBody>
          </Card>
        )}

        {tonConnectUI.connected && (
          <Card shadow="sm">
            <CardHeader>
              <div className="flex flex-col gap-4 w-full">
                <div className="flex justify-between items-center w-full">
                  <p className="text-lg">Wallet</p>
                  <p className="text-sm text-default-700">
                    {shortenAddress(userFriendlyAddress)}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  {addressInfo && (
                    <div className="flex items-center gap-3">
                      <Avatar src="https://ton.org/download/ton_symbol.svg" />
                      <div className="flex flex-col gap-0.5">
                        <p className="text-xl font-semibold">
                          <span className="font-mono">
                            {addressInfo.balance}
                          </span>{' '}
                          <span className=" text-lg">TON</span>
                        </p>
                      </div>
                    </div>
                  )}

                  {addressInfo && (
                    <div className="flex items-center gap-3">
                      <Avatar src="https://ton.org/download/ton_symbol.svg" />
                      <div className="flex flex-col gap-0.5">
                        <p className="text-xl font-semibold">
                          <span className="font-mono">
                            {addressInfo.balance}
                          </span>{' '}
                          <span className=" text-lg">WEBTON</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>
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
