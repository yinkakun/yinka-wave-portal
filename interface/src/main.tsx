import React from "react";
import ReactDOM from "react-dom/client";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { WagmiConfig, createClient, chain, configureChains } from "wagmi";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SwitchNetworkModal from "./components/switch-network";
import useIsSupportedChain from "./hooks/use-is-supported-chain";
import Index from "./pages";
import "./index.css";

const ALCHEMY_ID = import.meta.env.VITE_ALCHEMY_ID;
const JSON_RPC_URL = import.meta.env.VITE_JSON_RPC_URL;

const { chains, provider } = configureChains(
  [chain.rinkeby],
  [alchemyProvider({ alchemyId: ALCHEMY_ID })]
);

const getWalletConnectors = (jsonRpcUrl: string | undefined) => {
  if (!jsonRpcUrl) {
    throw new Error("JSON_RPC_URL is not defined");
  }

  const metaMask = new MetaMaskConnector({
    chains,
  });

  const walletConnect = new WalletConnectConnector({
    chains,
    options: {
      qrcode: true,
      rpc: {
        1: jsonRpcUrl,
      },
    },
  });

  return [metaMask, walletConnect];
};

const walletConnectors = getWalletConnectors(JSON_RPC_URL);

const client = createClient({
  provider,
  autoConnect: true,
  connectors: walletConnectors,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <SwitchNetworkModal />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </WagmiConfig>
  </React.StrictMode>
);
