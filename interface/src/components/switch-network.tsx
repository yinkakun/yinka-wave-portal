import useIsSupportedChain from "../hooks/use-is-supported-chain";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useAccount } from "wagmi";
import { useSwitchNetwork } from "wagmi";

const SwitchNetworkModal = () => {
  const { isConnected } = useAccount();
  const { isSupportedChain } = useIsSupportedChain();
  const { error, isLoading, switchNetwork } = useSwitchNetwork({
    chainId: 4,
  });

  const handleSwitchNetwork = () => {
    if (switchNetwork) switchNetwork();
  };

  if (!isConnected) {
    return null;
  }

  if (!isSupportedChain) {
    return (
      <AlertDialog.Root defaultOpen>
        <AlertDialog.Overlay className="flex p-2 fixed z-50 top-0 w-screen h-screen justify-center items-center bg-transparent backdrop-blur-sm">
          <AlertDialog.Content className="max-w-sm flex flex-col gap-6 text-center w-full p-4 rounded-2xl bg-rose-100 border border-rose-200">
            <div className="flex flex-col gap-2 opacity-80">
              <AlertDialog.Title className="text-lg">
                🟨 Unsupported Network
              </AlertDialog.Title>
              <AlertDialog.Description className="text-sm">
                This dApp only supports Rinkeby testnet. Switch or disconnect to
                continue.
              </AlertDialog.Description>
            </div>
            <AlertDialog.Action
              onClick={handleSwitchNetwork}
              className="text-sm rounded-full px-4 py-2 w-full bg-rose-500 text-white"
            >
              Switch Network to Rinkeby
            </AlertDialog.Action>
          </AlertDialog.Content>
        </AlertDialog.Overlay>
      </AlertDialog.Root>
    );
  }

  return null;
};

export default SwitchNetworkModal;
