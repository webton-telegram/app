import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Skeleton,
} from '@nextui-org/react';
import { FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  useIsConnectionRestored,
  useTonAddress,
  useTonConnectUI,
} from '@tonconnect/ui-react';

import cards from 'data/card';
import useTelegramAuth from 'hooks/useTelegramAuth';
import useTonAddressInfo from 'hooks/useTonAddressInfo';
import { shortenAddress } from 'lib/utils';

import LayoutContainer from 'components/layout/LayoutContainer';
import ComicsItem from 'components/Card';

const Profile = () => {
  const { isTelegramView, telegramAuthData } = useTelegramAuth();
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const connectionRestored = useIsConnectionRestored();
  const { addressInfo } = useTonAddressInfo();
  const navigate = useNavigate();

  const handleConnect = async () => {
    await tonConnectUI.openModal();
  };

  const handleNavigate = (target: string) => () => {
    navigate(target);
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

        <Divider />

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg">History</h2>
            <button
              className="flex justify-center items-center gap-1 text-default-500 text-sm"
              onClick={handleNavigate('/profile/recently')}
            >
              More <FaChevronRight size={12} />
            </button>
          </div>

          <div className="relative z-0 grid grid-cols-3 gap-2 pb-4">
            {cards.slice(0, 6).map((card) => (
              <ComicsItem key={`history-${card.title}`} {...card} />
            ))}
          </div>
        </div>

        <Divider />

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg">Recommend</h2>
            <button
              className="flex justify-center items-center gap-1 text-default-500 text-sm"
              onClick={handleNavigate('/profile/recommended')}
            >
              More <FaChevronRight size={12} />
            </button>
          </div>

          <div className="relative z-0 grid grid-cols-3 gap-2 pb-4">
            {cards.slice(0, 6).map((card) => (
              <ComicsItem key={`recommend-${card.title}`} {...card} />
            ))}
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default Profile;
