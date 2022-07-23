import useIsSupportedChain from "../hooks/use-is-supported-chain";
import { useSwitchNetwork } from "wagmi";

const SwitchNetworkModal = () => {
  const { isSupportedChain } = useIsSupportedChain();
  const { error, isLoading, switchNetwork } = useSwitchNetwork({
    chainId: 4,
  });

  const handleSwitchNetwork = () => {
    if (switchNetwork) switchNetwork();
  };

  if (!isSupportedChain) {
    return (
      <div className="h-screen w-screen fixed flex p-2 justify-center items-center top-0 z-[100] bg-white bg-opacity-10 backdrop-blur-sm border-8 rounded-md border-white border-opacity-30">
        <div className="max-w-sm flex flex-col gap-6 text-center w-full p-4 rounded-2xl bg-rose-100 border border-rose-200">
          <div className="flex flex-col gap-2 opacity-80">
            <h2 className="text-lg">🟨 Unsupported Network</h2>
            <p className="text-sm">This dApp only supports Rinkeby testnet.</p>
          </div>
          <button
            onClick={handleSwitchNetwork}
            className="text-sm rounded-full px-4 py-2 w-full bg-rose-500 text-white"
          >
            Switch Network to Rinkeby
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default SwitchNetworkModal;
