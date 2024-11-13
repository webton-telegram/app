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
  Snippet,
} from '@nextui-org/react';
import { FaChevronRight } from 'react-icons/fa';
import { MdContentCopy } from 'react-icons/md';
import { RiRefreshLine } from 'react-icons/ri';
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
  const {
    addressInfo,
    refetch: refetchAddressInfo,
    isError: isErrorAddressInfo,
  } = useTonAddressInfo();
  const {
    jettonBalance,
    refetch: refetchGetJetton,
    isError: isErrorJettonBalance,
  } = useJettonBalance();
  const navigate = useNavigate();
  const wallet = useTonWallet();

  const { status, session, update: updateSession } = useSession();

  const [isConnecting, setIsConnecting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReloadableWallet, setIsReloadableWallet] = useState(true);

  const isPrepared = usePrepareTonConnect();

  const handleReloadWallet = async () => {
    setIsReloadableWallet(false);
    await refetchAddressInfo();
    await refetchGetJetton();

    setTimeout(() => {
      setIsReloadableWallet(true);
    }, 10000);
  };

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

    try {
      await toast.promise(withdrawPoint({ amount: session.user.point }), {
        pending: 'Pending Transaction...',
        success: 'Complete Transaction',
        error: 'Failed To Transfer! Please try again.',
      });
    } catch {
      setIsProcessing(false);
      return;
    }

    setTimeout(() => {
      setIsProcessing(false);
    }, 3000);

    await refetchGetJetton();
    await updateSession();
  };

  useEffect(() => {
    updateSession();
  }, [updateSession]);

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
            {!connectionRestored && (
              <CardBody>
                <Skeleton className="w-full h-10 rounded-xl" />
              </CardBody>
            )}
            {connectionRestored &&
              tonConnectUI.connected &&
              session.user.point > 0 && (
                <CardBody>
                  <Button
                    color="success"
                    isLoading={isProcessing}
                    disabled={session.user.point <= 0}
                    onClick={handleTransfer}
                  >
                    Transfer WEBTON
                  </Button>
                </CardBody>
              )}
            {connectionRestored && !tonConnectUI.connected && (
              <CardBody>
                <Chip color="warning" variant="bordered">
                  Not Connected
                </Chip>
              </CardBody>
            )}
          </Card>
        )}

        <Card shadow="sm">
          <CardHeader>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-1">
                  <p className="text-lg">Wallet</p>
                  {}
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    disabled={!isReloadableWallet}
                    onClick={handleReloadWallet}
                  >
                    <RiRefreshLine size={16} />
                  </Button>
                </div>
                {!isConnecting && tonConnectUI.connected && (
                  <Snippet
                    symbol=""
                    disableTooltip
                    size="sm"
                    variant="flat"
                    color="default"
                    copyIcon={<MdContentCopy size={16} />}
                    classNames={{
                      base: 'bg-transparent',
                      copyButton: 'min-w-6 w-6 h-6',
                    }}
                  >
                    {shortenAddress(userFriendlyAddress)}
                  </Snippet>
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
                        {!isErrorAddressInfo ? (
                          <div className="flex flex-col gap-0.5">
                            <p className="text-xl font-semibold">
                              <span className="font-mono">
                                {formatTon(+addressInfo.balance)}
                              </span>{' '}
                              <span className=" text-lg">TON</span>
                            </p>
                          </div>
                        ) : (
                          <p className="text-default-800">Failed to load TON</p>
                        )}
                      </div>
                    )}

                    {jettonBalance &&
                      jettonBalance.jetton_wallets?.length > 0 && (
                        <div className="flex items-center gap-3">
                          <Avatar src="https://ton.org/download/ton_symbol.svg" />
                          {!isErrorJettonBalance ? (
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
                          ) : (
                            <p className="text-default-800">
                              Failed to load WEBTON
                            </p>
                          )}
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
