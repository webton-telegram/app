export type ResultGetPayload = {
  payload: string;
};

export type TonProof = {
  timestamp: string;
  domain: {
    lengthBytes: number;
    value: string;
  };
  signature: string;
  payload: string;
};

export type RequestSyncWalletParams = {
  address: string;
  publicKey: string;
  proof: TonProof & { stateInit: string };
};
