import * as Dialog from "@radix-ui/react-dialog";
import { useAccount, useEnsName, useBalance } from "wagmi";
import { useConnect, useDisconnect } from "wagmi";
import { Connector } from "wagmi";
import { useCopyToClipboard } from "usehooks-ts";

const ConnectWallet = () => {
  const { isConnected, address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: balance } = useBalance({ addressOrName: address });
  const formatedBalance = parseFloat(balance?.formatted || "0").toFixed(2);

  return (
    <Dialog.Root>
      <Dialog.DialogTrigger>
        <button className="px-6 bg-rose-100 shadow-none rounded-full py-2 text-rose-500 capitalize border-2 border-white bg-opacity-50 ">
          {isConnected ? (
            <span className="flex gap-2">
              <span>{formatedBalance}</span>
              <span>{balance?.symbol}</span>
              <span className="max-w-[100px] overflow-hidden whitespace-nowrap truncate">
                <span>{ensName || address}</span>
              </span>
            </span>
          ) : (
            <span>Connect Wallet</span>
          )}
        </button>
      </Dialog.DialogTrigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-500 bg-opacity-10 transition-all duration-300 border-2 h-screen z-50 fixed w-full top-0 flex items-center justify-center">
          <Dialog.Content className="w-full max-w-md py-4 px-4 rounded-2xl bg-rose-50 border-2 border-neutral-200">
            <div className="flex items-center justify-between">
              <Dialog.Title>
                {isConnected ? "Account" : "Connect Wallet"}
              </Dialog.Title>
              <Dialog.Close className="text-sm rounded-full px-4 p-1 bg-rose-200 text-rose-500">
                Close
              </Dialog.Close>
            </div>

            <div className="mt-8">
              {isConnected ? <Address /> : <WallletConnectors />}
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export { ConnectWallet };

const WallletConnectors = () => {
  const { connect, connectors, isLoading, pendingConnector } = useConnect();

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
