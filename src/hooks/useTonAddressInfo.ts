import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useQuery } from '@tanstack/react-query';

type TonAddressInfo = {
  balance: string;
  code: string;
  data: string;
  last_transaction_lt: string;
  last_transaction_hash: string;
  frozen_hash: string;
  status: string;
};

export default function useTonAddressInfo() {
  const [tonConnectUI] = useTonConnectUI();
  const rawAddress = useTonAddress(false);

  const isConnected = tonConnectUI.connected;

  const getAddressInfo = async () => {
    const res = await fetch(
      `https://toncenter.com/api/v3/addressInformation?address=${rawAddress}&use_v2=false`,
    );
    return (await res.json()) as TonAddressInfo;
  };

  const { isLoading, data } = useQuery({
    queryKey: ['ton-address-info'],
    queryFn: getAddressInfo,
    enabled: isConnected && rawAddress.length > 0,
  });

  return { isLoading, addressInfo: isConnected ? data : undefined };
}
