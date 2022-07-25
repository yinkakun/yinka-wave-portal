import { useAccount, useEnsName } from "wagmi";
import { useConnect, useDisconnect } from "wagmi";
import { Connector } from "wagmi";
import { useCopyToClipboard } from "usehooks-ts";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const RINKEBY_CHAIN_ID = 4;

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConnectWalletModal = ({ isOpen, onClose }: ConnectWalletModalProps) => {
  const { isConnected } = useAccount();

  return (
    <Transition appear as={Fragment} show={isOpen}>
      <Dialog
        onClose={onClose}
        className="z-50 justify-center inset-0 fixed flex items-center"
      >
        <div
          className="flex p-4 fixed inset-0 justify-center items-center bg-transparent backdrop-blur-sm transition-all border-4 border-rose-300"
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
          <Dialog.Panel className="w-full max-w-md py-4 px-4 rounded-2xl bg-rose-100 border border-rose-200">
            <div className="flex items-center justify-between">
              <Dialog.Title>
                {isConnected ? "Account" : "Connect Wallet"}
              </Dialog.Title>
              <button
                onClick={onClose}
                className="text-sm rounded-full px-4 p-1 bg-rose-200 text-rose-500"
              >
                Close
              </button>
            </div>

            <div className="mt-8">
              {isConnected ? <Address /> : <WallletConnectors />}
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default ConnectWalletModal;

const WallletConnectors = () => {
  const { connect, connectors, isLoading, pendingConnector } = useConnect({
    chainId: RINKEBY_CHAIN_ID,
  });

  return (
    <div className="flex flex-col gap-2">
      {connectors.map((connector: Connector) => {
        return (
          <button
            key={connector.name}
            type="button"
            disabled={!connector.ready}
            onClick={() => connect({ connector })}
            className="border p-2 rounded-2xl border-neutral-300 bg-neutral-50 bg-opacity-50 text-opacity-75"
          >
            <span>
              {connector.name}
              {isLoading &&
                pendingConnector?.id === connector.id &&
                " connecting"}
            </span>
          </button>
        );
      })}
    </div>
  );
};

const Address = () => {
  const { disconnect } = useDisconnect();
  const { address, connector } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const [cliboard, copy] = useCopyToClipboard();

  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 bg-opacity-50 py-4 px-4">
      <div className="flex justify-between items-center">
        <span>Connected with {connector?.name}</span>
        <button
          className="text-xs rounded-full px-4 p-1 bg-rose-50 text-rose-500 border-rose-500 border"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div>
      <div className="mt-4 max-w-full overflow-hidden whitespace-nowrap truncate">
        <span className="text-xl">{ensName || address}</span>
      </div>
      <button
        onClick={() => copy(ensName || address || "")}
        className="border rounded-full border-neutral-300 bg-neutral-50 text-opacity-50 py-0.5 px-2 text-xs mt-3"
      >
        {cliboard === (ensName || address) ? "Copied" : "Copy Address"}
      </button>
    </div>
  );
};
