import { useEffect, useRef, useState } from 'react';
import {
  useIsConnectionRestored,
  useTonConnectUI,
  useTonWallet,
} from '@tonconnect/ui-react';
import { generatePayload } from 'service/api/wallet';

const payloadTTLMS = 1000 * 60 * 20;

export default function usePrepareTonConnect() {
  const isConnectionRestored = useIsConnectionRestored();
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const interval = useRef<ReturnType<typeof setInterval> | undefined>();

  const [isPrepared, setIsPrepared] = useState<boolean>(false);

  useEffect(() => {
    if (!isConnectionRestored) {
      return;
    }

    clearInterval(interval.current);

    if (!wallet) {
      const refreshPayload = async () => {
        try {
          tonConnectUI.setConnectRequestParameters({ state: 'loading' });

          const { payload } = await generatePayload();
          if (!payload) {
            tonConnectUI.setConnectRequestParameters(null);
          } else {
            tonConnectUI.setConnectRequestParameters({
              state: 'ready',
              value: { tonProof: payload },
            });
          }

          setIsPrepared(true);
        } catch {
          setIsPrepared(false);
        }
      };

      refreshPayload();
      setInterval(refreshPayload, payloadTTLMS);
    }
  }, [isConnectionRestored, wallet, tonConnectUI]);

  return isPrepared;
}
