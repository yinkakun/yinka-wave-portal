import { useContractWrite, useAccount } from "wagmi";
import useIsSupportedChain from "../hooks/use-is-supported-chain";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import SwitchNetworkModal from "./switch-network-modal";
import ConnectWalletModal from "./connect-wallet-modal";
import { contractAddressAndAbi } from "../constants";

interface IWaveMessage {
  message: string;
}

const SendWave = () => {
  const [showSwitchNetworkModal, setShowSwitchNetworkModal] = useState(false);
  const closeSwitchNetworkModal = () => setShowSwitchNetworkModal(false);
  const openSwitchNetworkModal = () => setShowSwitchNetworkModal(true);

  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);
  const closeConnectWalletModal = () => setShowConnectWalletModal(false);
  const openConnectWalletModal = () => setShowConnectWalletModal(true);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IWaveMessage>();
  const { isConnected } = useAccount();
  const { isSupportedChain } = useIsSupportedChain();

  useEffect(() => {
    if (isSupportedChain) {
      closeSwitchNetworkModal();
    }
  }, [isSupportedChain]);

  useEffect(() => {
    if (isConnected) {
      closeConnectWalletModal();
    }
  }, [isConnected]);

  const waveMessage = watch("message");

  const notifySuccessfulWave = () =>
    toast.custom(
      <div className="bg-green-400 py-3 px-3 bg-opacity-80 backdrop-blur border-opacity-50 border border-white text-white text-xs text-center">
        Wave sent successfully. WAGMI!
      </div>
    );

  const notifyUnsuccessfulWave = () =>
    toast.custom(
      <div className="bg-red-600 py-3 px-3 bg-opacity-80 backdrop-blur border-opacity-50 border border-white text-white text-xs text-center">
        You have to wait for at least 15 mins to send another wave :(
      </div>
    );

  const { isLoading, write } = useContractWrite({
    ...contractAddressAndAbi,
    functionName: "wave",
    args: [waveMessage],
    onSuccess() {
      notifySuccessfulWave();
      reset();
    },
    onError() {
      notifyUnsuccessfulWave();
    },
  });

  const sendWave = () => {
    if (!isConnected) {
      openConnectWalletModal();
      return;
    }

    if (!isSupportedChain) {
      openSwitchNetworkModal();
      return;
    }

    write();
  };

  const onSubmit: SubmitHandler<IWaveMessage> = () => sendWave();

  return (
    <div className="w-full max-w-md ">
      <form
        className="flex items-center h-10 border border-rose-500"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Hello Fren!"
          {...register("message", {
            required: "Message cannot be blank",
            maxLength: {
              value: 140,
              message: "Message cannot be longer than 140 characters",
            },
          })}
          className="bg-rose-100  h-full px-2 py-2 grow focus:outline-none text-sm text-neutral-600"
        />

        <button
          type="submit"
          className="bg-rose-500 p-2 px-3 text-rose-50 h-full shrink-0 basis-24"
        >
          {isLoading ? "Waving..." : "Wave"}
        </button>
      </form>
      <div className="h-6 my-1">
        {errors.message && (
          <span className=" text-red-600 text-xs w-full flex items-center justify-center">
            {errors.message?.message}
          </span>
        )}
      </div>
      <Toaster position="bottom-center" gutter={8} />
      <SwitchNetworkModal
        isOpen={showSwitchNetworkModal}
        onClose={closeSwitchNetworkModal}
      />
      <ConnectWalletModal
        isOpen={showConnectWalletModal}
        onClose={closeConnectWalletModal}
      />
    </div>
  );
};

export default SendWave;
