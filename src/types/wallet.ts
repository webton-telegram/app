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

export type TonAddressInfo = {
  balance: string;
  code: string;
  data: string;
  last_transaction_lt: string;
  last_transaction_hash: string;
  frozen_hash: string;
  status: string;
};

export type JettonWallet = {
  address: string;
  balance: string;
  owner: string;
  jetton: string;
  last_transaction_lt: string;
  code_hash: string;
  data_hash: string;
};

export type AddressBookRow = {
  user_friendly: string;
};

export type AddressBook = Record<string, AddressBookRow>;

export type JettonWalletData = {
  jetton_wallets: JettonWallet[];
  address_book: AddressBook;
};
