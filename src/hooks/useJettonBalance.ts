import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useQuery } from '@tanstack/react-query';

import type { JettonWalletData } from 'types/wallet';

const WEBTON_JETTON_ADDRESS =
  'EQAx9486ShhsN978ZVs0W4-atICvw2ecsC9icCJiU_ZPRV3p';

export default function useJettonBalance() {
  const [tonConnectUI] = useTonConnectUI();
  const rawAddress = useTonAddress(false);

  const isConnected = tonConnectUI.connected;
  const isEnable = isConnected && rawAddress.length > 0;

  const getJettonBalance = async () => {
    const res = await fetch(
      `https://${import.meta.env.DEV ? 'testnet.' : 'testnet.'}toncenter.com/api/v3/jetton/wallets?owner_address=${rawAddress}&jetton_address=${WEBTON_JETTON_ADDRESS}&exclude_zero_balance=true&limit=10&offset=0`,
    );
    return (await res.json()) as JettonWalletData;
  };

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['jetton-balance-info'],
    queryFn: getJettonBalance,
    enabled: isConnected && rawAddress.length > 0,
    refetchInterval: 10000,
  });

  return { isLoading, jettonBalance: isEnable ? data : undefined, refetch };
}
