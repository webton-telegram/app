import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useQuery } from '@tanstack/react-query';

import type { TonAddressInfo } from 'types/wallet';
import { ResponseTonCenterError } from 'types/fetch';

export default function useTonAddressInfo() {
  const [tonConnectUI] = useTonConnectUI();
  const rawAddress = useTonAddress(false);

  const isConnected = tonConnectUI.connected;

  const getAddressInfo = async () => {
    const res = await fetch(
      `https://toncenter.com/api/v3/addressInformation?address=${rawAddress}&use_v2=false`,
    );

    if (!res.ok) {
      const data = (await res.json()) as ResponseTonCenterError;
      throw new Error(data.result);
    }

    return (await res.json()) as TonAddressInfo;
  };

  const { isLoading, data, refetch, error, isError } = useQuery({
    queryKey: ['ton-address-info'],
    queryFn: getAddressInfo,
    enabled: isConnected && rawAddress.length > 0,
  });

  return {
    isLoading,
    addressInfo: isConnected ? data : undefined,
    refetch,
    error,
    isError,
  };
}
