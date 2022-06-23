import { BigNumber } from "ethers";
import { ComponentType } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";

export interface Chain {
  key: "ethereum" | "polygon-hermez";
  Icon: ComponentType<{ className?: string }>;
  provider: JsonRpcProvider;
  networkId: number;
  chainId: number;
  contractAddress: string;
  explorerUrl: string;
}

export interface Token {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  chainId: number;
  logoURI: string;
}

export type TokenWithBalance = Token & { balance: BigNumber | undefined };

export interface Env {
  bridgeApiUrl: string;
  fiatExchangeRates: {
    apiUrl: string;
    apiKey: string;
    usdcToken: Token;
  };
  chains: [Chain, Chain];
  version: string;
}

export interface RouterState {
  redirectUrl: string;
}

export enum WalletName {
  METAMASK = "MetaMask",
  WALLET_CONNECT = "WalletConnect",
}

export enum EthereumEvent {
  ACCOUNTS_CHANGED = "accountsChanged",
  CHAIN_CHANGED = "chainChanged",
  DISCONNECT = "disconnect",
}

export enum Currency {
  EUR = "EUR",
  USD = "USD",
  JPY = "JPY",
  GBP = "GBP",
  CNY = "CNY",
}

export type FiatExchangeRates = Partial<Record<keyof typeof Currency, number>>;

// User notifications
export type Message =
  | {
      type: "info-msg" | "success-msg" | "error-msg";
      text: string;
    }
  | {
      type: "error";
      text?: string;
      parsed: string;
    };

export type Bridge =
  | {
      status: "initiated";
      id: string;
      deposit: Deposit;
    }
  | {
      status: "on-hold";
      id: string;
      deposit: Deposit;
      merkleProof: MerkleProof;
    }
  | {
      status: "completed";
      id: string;
      deposit: Deposit;
    };

export interface Deposit {
  token: Token;
  amount: BigNumber;
  fiatAmount: BigNumber | undefined;
  from: Chain;
  to: Chain;
  tokenOriginNetwork: number;
  destinationAddress: string;
  depositCount: number;
  depositTxHash: string;
  claimTxHash: string | undefined;
}

export interface MerkleProof {
  merkleProof: string[];
  exitRootNumber: number;
  l2ExitRootNumber: number;
  mainExitRoot: string;
  rollupExitRoot: string;
}

export interface FormData {
  from: Chain;
  to: Chain;
  token: Token;
  amount: BigNumber;
  estimatedFee: BigNumber;
}
