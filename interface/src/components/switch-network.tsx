import useIsSupportedChain from "../hooks/use-is-supported-chain";
import { Dialog, Transition } from "@headlessui/react";
import { useAccount, useDisconnect } from "wagmi";
import { useSwitchNetwork } from "wagmi";
import { Fragment } from "react";

const SwitchNetworkModal = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
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

  return (
    <Transition appear as={Fragment} show={!isSupportedChain}>
      <Dialog
        onClose={() => {}}
        className="fixed z-[100] inset-0 flex items-center justify-center"
      >
        <div
          className="flex p-4 fixed inset-0 justify-center items-center bg-transparent backdrop-blur-sm transition-opacity border-4 border-rose-300"
          aria-hidden="true"
        />

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="max-w-sm relative transition-all flex flex-col gap-6 text-center w-full p-4 rounded-2xl bg-rose-100 border border-rose-300">
            <div className="flex flex-col gap-2 opacity-80">
              <Dialog.Title className="text-lg">
                🟨 Unsupported Network
              </Dialog.Title>
              <Dialog.Description className="text-sm">
                This dApp only supports Rinkeby testnet. Switch or disconnect to
                continue.
              </Dialog.Description>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleSwitchNetwork}
                className="text-sm rounded-full px-4 py-2 w-full bg-rose-500 text-white"
              >
                {isLoading ? "Switching" : "Switch"} Network to Rinkeby
              </button>

              <button
                onClick={() => disconnect()}
                className="text-sm rounded-full px-4 py-2 w-full bg-rose-100 border border-rose-300 text-rose-600"
              >
                Disconnect
              </button>
            </div>

            {error && (
              <p className="text-xs text-red-500">Error: {error?.message}</p>
            )}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default SwitchNetworkModal;
