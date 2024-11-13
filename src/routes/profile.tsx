import { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Skeleton,
} from '@nextui-org/react';
import { FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  useIsConnectionRestored,
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from '@tonconnect/ui-react';
import { toast } from 'react-toastify';

import cards from 'data/card';
import useSession from 'hooks/useSession';
import usePrepareTonConnect from 'hooks/usePrepareTonConnect';
import useTonAddressInfo from 'hooks/useTonAddressInfo';
import useJettonBalance from 'hooks/useJettonBalance';
import { formatTon, shortenAddress } from 'lib/utils';
import { syncWallet, withdrawPoint } from 'service/api/wallet';

import type { TonProof } from 'types/wallet';

import LayoutContainer from 'components/layout/LayoutContainer';
import ComicsItem from 'components/Card';

const Profile = () => {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const connectionRestored = useIsConnectionRestored();
  const { addressInfo } = useTonAddressInfo();
  const { jettonBalance, refetch: refetchGetJetton } = useJettonBalance();
  const navigate = useNavigate();
  const wallet = useTonWallet();

  const { status, session, update: updateSession } = useSession();

  const [isConnecting, setIsConnecting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const isPrepared = usePrepareTonConnect();

  const handleConnect = async () => {
    if (!isPrepared) {
      return;
    }

    setIsConnecting(true);

    await tonConnectUI.openModal();
  };

  const handleNavigate = (target: string) => () => {
    navigate(target);
  };

  const handleTransfer = async () => {
    if (!session || !session.user) {
      toast.error('Failed to transfer');
      return;
    }

    if (session && session.user.point === 0) {
      toast.error('Not enough point!');
      return;
    }

    setIsProcessing(true);

    await toast.promise(withdrawPoint({ amount: session.user.point }), {
      pending: 'Pending Transaction...',
      success: 'Complete Transaction',
      error: 'Failed To Transfer! Please try again.',
    });

    setIsProcessing(false);
    await refetchGetJetton();
    await updateSession();
  };

  useEffect(() => {
    if (!connectionRestored) {
      return;
    }

    if (isPrepared && tonConnectUI.connected && wallet && isConnecting) {
      const updateFailedToConnect = async () => {
        setIsConnecting(false);

        await tonConnectUI.disconnect();
      };

      (async () => {
        try {
          const {
            address,
            publicKey,
            walletStateInit: stateInit,
          } = wallet.account;

          if (
            !wallet.connectItems ||
            !wallet.connectItems.tonProof ||
            !publicKey
          ) {
            toast.error(
              <div>
                <p>Failed to connect.</p>
                <p>Please retry!</p>
              </div>,
            );
            await updateFailedToConnect();

            return;
          }

          if ('proof' in wallet.connectItems.tonProof) {
            const result = await syncWallet({
              address,
              publicKey,
              proof: {
                ...(wallet.connectItems.tonProof.proof as unknown as TonProof),
                stateInit,
              },
            });

            if (!result) {
              toast.error(
                <div>
                  <p>Failed to connect.</p>
                  <p>Please retry!</p>
                </div>,
              );
              await updateFailedToConnect();
            }

            setIsConnecting(false);
          }
        } catch (error) {
          toast.error(
            <div>
              <p>Failed to connect.</p>
              <p>Please retry!</p>
            </div>,
          );
          await updateFailedToConnect();
        }
      })();
    }
  }, [connectionRestored, isPrepared, tonConnectUI, wallet, isConnecting]);

  useEffect(() => {
    tonConnectUI.onModalStateChange((modalState) => {
      if (modalState.closeReason === 'action-cancelled') {
        setIsConnecting(false);
      }
    });
  }, [tonConnectUI]);

  return (
    <LayoutContainer>
      <div className="flex flex-col gap-4 py-4">
        {status === 'loading' && (
          <Card shadow="sm">
            <CardHeader className="flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-10 h-10" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-36 rounded-sm" />
                <Skeleton className="h-3 w-24 rounded-sm" />
              </div>
            </CardHeader>
            <CardBody>
              <Skeleton className="h-10 w-full rounded-medium" />
            </CardBody>
          </Card>
        )}
        {status === 'authenticated' && session && (
          <Card shadow="sm">
            <CardHeader className="flex items-center gap-3">
              <div>
                <Avatar name={session.user.firstName[0].toUpperCase()} />
              </div>
              <div className="flex flex-col">
                <p className="text-small text-default-500">
                  @{session.user.userName}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">
                    {session.user.point.toLocaleString()}
                  </span>{' '}
                  P
                </p>
              </div>
            </CardHeader>
            <CardBody>
              {!connectionRestored && (
                <Skeleton className="w-full h-10 rounded-xl" />
              )}
              {connectionRestored &&
                tonConnectUI.connected &&
                session.user.point > 0 && (
                  <Button
                    color="success"
                    isLoading={isProcessing}
                    disabled={session.user.point <= 0}
                    onClick={handleTransfer}
                  >
                    Transfer WEBTON
                  </Button>
                )}
              {connectionRestored && !tonConnectUI.connected && (
                <Chip color="warning" variant="bordered">
                  Not Connected
                </Chip>
              )}
            </CardBody>
          </Card>
        )}

        <Card shadow="sm">
          <CardHeader>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex justify-between items-center w-full">
                <p className="text-lg">Wallet</p>
                {!isConnecting && tonConnectUI.connected && (
                  <p className="text-sm text-default-700">
                    {shortenAddress(userFriendlyAddress)}
                  </p>
                )}
              </div>

              {!connectionRestored && (
                <Skeleton className="w-full h-10 rounded-xl" />
              )}

              {connectionRestored && !tonConnectUI.connected && (
                <Button
                  color="success"
                  isLoading={isConnecting}
                  onClick={handleConnect}
                >
                  {isConnecting ? 'Connecting' : 'Connect wallet'}
                </Button>
              )}

              {connectionRestored &&
                tonConnectUI.connected &&
                !isConnecting && (
                  <div className="flex flex-col gap-2">
                    {addressInfo && (
                      <div className="flex items-center gap-3">
                        <Avatar src="https://ton.org/download/ton_symbol.svg" />
                        <div className="flex flex-col gap-0.5">
                          <p className="text-xl font-semibold">
                            <span className="font-mono">
                              {formatTon(+addressInfo.balance)}
                            </span>{' '}
                            <span className=" text-lg">TON</span>
                          </p>
                        </div>
                      </div>
                    )}

                    {jettonBalance &&
                      jettonBalance.jetton_wallets?.length > 0 && (
                        <div className="flex items-center gap-3">
                          <Avatar src="https://ton.org/download/ton_symbol.svg" />
                          <div className="flex flex-col gap-0.5">
                            <p className="text-xl font-semibold">
                              <span className="font-mono">
                                {formatTon(
                                  +jettonBalance.jetton_wallets[0].balance,
                                )}
                              </span>{' '}
                              <span className=" text-lg">WEBTON</span>
                            </p>
                          </div>
                        </div>
                      )}
                  </div>
                )}
            </div>
          </CardHeader>
        </Card>

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
