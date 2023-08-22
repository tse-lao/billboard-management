"use client";

import { AddressWrapper } from "@/components/core/address-wrapper";
import { Web3Auth } from "@web3auth/modal";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Chain, WagmiConfig, configureChains, createConfig } from "wagmi";
import { polygonZkEvmTestnet } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";
import Navbar from "./nav-bar";

export const polygonMumbai = {
  id: 80_001,
  name: 'Polygon Mumbai',
  network: 'maticmum',
  nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  rpcUrls: {
    alchemy: {
      http: ['https://polygon-mumbai.g.alchemy.com/v2'],
      webSocket: ['wss://polygon-mumbai.g.alchemy.com/v2'],
    },
    infura: {
      http: ['https://polygon-mumbai.infura.io/v3'],
      webSocket: ['wss://polygon-mumbai.infura.io/ws/v3'],
    },
    default: {
      http: ['https://polygon-mumbai-bor.publicnode.com	'],
    },
    public: {
      http: ['https://polygon-mumbai-bor.publicnode.com	'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'PolygonScan',
      url: 'https://mumbai.polygonscan.com',
    },
    default: {
      name: 'PolygonScan',
      url: 'https://mumbai.polygonscan.com',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 25770160,
    },
  },
  testnet: true,
} as const satisfies Chain;
// Configure chains & providers with the Public provider.
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai, polygonZkEvmTestnet],
  [publicProvider()]
);

const web3AuthInstance =
  typeof window !== "undefined"
    ? new Web3Auth({
        clientId:
          "BDlUlpSomDUSEzG9ZfwlbTUuhSnNPHqQuciI7suaSc4xMwQV_B3xHwXEFmDml2Rh96GnXuNFw4pfQ5CPX6B0A7o",
        web3AuthNetwork: "testnet",
        chainConfig: {
          chainNamespace: "eip155",
          chainId: "0x13881",
          rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
          displayName: "Polygon Mumbai Testnet",
          blockExplorer: "https://mumbai.polygonscan.com/",
          ticker: "MATIC",
          tickerName: "Matic",
        },
      })
    : null;

const config = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "Browser",
        shimDisconnect: true,
      },
    }),
    new Web3AuthConnector({
      chains: chains as any,
      // @ts-ignore
      options: {web3AuthInstance},
    }),
    //Web3AuthConnectorInstance(chains) as any,
  ],
  publicClient,
  webSocketPublicClient,
});

let links = [
  {
    href: "/",
    name: "Dashboard",
  },
  {
    href: "/billboard/a",
    name: "billboard",
  },
];

export default function App({ children }: { children: any }) {
  return (

      <WagmiConfig config={config}>
        <Navbar links={links} />

        <AddressWrapper>
          {children}
          <ToastContainer position="bottom-center" />
        </AddressWrapper>
      </WagmiConfig>

  );
}