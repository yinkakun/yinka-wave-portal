import { useAccount, useEnsName, useBalance } from "wagmi";
import { Fragment, useState } from "react";
import abbreviateETHBalance from "../utils/abbreviate-eth-balance";
import formatAddress from "../utils/format-address";
import formatENS from "../utils/format-ens";
import ConnectWalletModal from "./connect-wallet-modal";

const ConnectWalletButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected, address } = useAccount();
  const { data: balance } = useBalance({ addressOrName: address });
  const { data: ensName } = useEnsName({ address });
  const balanceInNumber = parseFloat(balance?.formatted || "0");

  const formattedEns = ensName ? formatENS(ensName) : null;
  const formattedAddress = address ? formatAddress(address) : null;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <Fragment>
      <button onClick={openModal}>
        <div className="px-6 bg-white bg-opacity-50 shadow-none rounded-full py-2 text-rose-500 capitalize border-2 border-white hover:border-rose-300 ease-linear duration-300">
          {isConnected ? (
            <span className="flex gap-3">
              <div>
                <span>{abbreviateETHBalance(balanceInNumber)}</span>{" "}
                <span>{balance?.symbol}</span>
              </div>

              <span>{formattedEns || formattedAddress}</span>
            </span>
          ) : (
            <span>Connect Wallet</span>
          )}
        </div>
      </button>
      <ConnectWalletModal isOpen={isOpen} onClose={closeModal} />
    </Fragment>
  );
};

export default ConnectWalletButton;
