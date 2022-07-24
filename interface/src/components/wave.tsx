import { useContractRead, useContractWrite, useAccount } from "wagmi";
import wavePortalAbi from "../abi/wave-portal.json";
import useIsSupportedChain from "../hooks/use-is-supported-chain";
import Marquee from "react-fast-marquee";
import { formatDistanceToNow } from "date-fns";
import { useState, Fragment } from "react";
import { BigNumber } from "ethers";
import toast, { Toaster } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import formatAddress from "../utils/format-address";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const contractAddressAndAbi = {
  addressOrName: CONTRACT_ADDRESS,
  contractInterface: wavePortalAbi.abi,
};

const WavePortal = () => {
  return (
    <div className="flex gap-4 container items-center justify-center mx-auto grow flex-col">
      <WaveBanner />
      <SendWave />
      <WaveCount />
      <WaveMessageList />
    </div>
  );
};

export default WavePortal;

const WaveBanner = () => {
  return (
    <Fragment>
      <h1 className="text-lg flex items-center gap-2 uppercase">
        <span className="text-4xl w-[80px] h-[80px] flex items-center justify-center rounded-full p-2 bg-white border-2 border-rose-500 bg-opacity-70 backdrop-blur select-none relative z-20 animate-wiggle ">
          <span className="-scale-x-[1]">👋🏼</span>
        </span>
        <span className="bg-rose-500 h-[70px] flex items-center rounded bg-opacity-80 backdrop-blur-sm relative z-10 px-20 p-2 text-rose-50 xrounded-full -mx-20 ">
          Wave at Me!
        </span>
        <span className="text-4xl w-[80px] h-[80px] flex items-center justify-center rounded-full p-2 bg-white border-2 backdrop-blur bg-opacity-70 select-none -translate-x-6 relative z-20 animate-wiggle border-rose-500">
          <span className="scale-x-[1]">👋🏼</span>
        </span>
      </h1>
      <p className="max-w-md text-center text-sm text-neutral-600">
        Hi fren! I'm Yinks. You can wave at me with a message on the Rinkeby
        network. If you're lucky, you might even get some RinkebyETH
      </p>
    </Fragment>
  );
};

interface IWaveMessage {
  message: string;
}

const SendWave = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IWaveMessage>();
  const { isConnected } = useAccount();
  const { isSupportedChain } = useIsSupportedChain();

  const waveMessage = watch("message");

  const notifySuccessfulWave = () =>
    toast.custom(
      <div className="bg-green-400 py-3 px-3 bg-opacity-80 backdrop-blur border-opacity-50 border border-white text-white text-xs text-center">
        Wave sent successfully . Thanks for waving at me. WAGMI!
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
      console.log("Not connected");
      // show connect modal
      return;
    }

    if (!isSupportedChain) {
      console.error("Not supported chain");
      // show wrong network modal
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
            maxLength: 100,
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
    </div>
  );
};

interface IWave {
  waver: string;
  message: string;
  timestamp: BigNumber;
}

const WaveMessageList = () => {
  const { data: waves } = useContractRead({
    ...contractAddressAndAbi,
    functionName: "getAllWaves",
    watch: true,
  });

  if (waves && waves.length > 0) {
    return (
      <Marquee gradient={false} pauseOnHover speed={80} className="flex mt-6">
        <div className="flex gap-4 flex-1 mr-4">
          {waves.map((wave: IWave, index) => {
            return <WaveMessage key={index} wave={wave} />;
          })}
        </div>
      </Marquee>
    );
  }

  return null;
};

interface WaveProps {
  wave: IWave;
}

const WaveMessage = ({ wave }: WaveProps) => {
  const { waver, message, timestamp } = wave;
  const timestampInDate = new Date(timestamp.toNumber() * 1000);
  const formattedTime = formatDistanceToNow(timestampInDate);

  return (
    <div className="bg-white backdrop-blur px-4 w-full py-4 border border-white bg-opacity-50 text-neutral-600 flex flex-col grow basis-40 shrink-0">
      <div className="text-rose-600 text-lg flex-1 mb-3">{message}</div>
      <div className="flex justify-between gap-1 text-xs">
        <span>BY: {formatAddress(waver)}</span>
        <span className="capitalize">{formattedTime} ago</span>
      </div>
    </div>
  );
};

const WaveCount = () => {
  const { data: waveCount, isLoading } = useContractRead({
    ...contractAddressAndAbi,
    functionName: "getWaveCount",
    watch: true,
  });

  if (waveCount) {
    const waveCountNumber = waveCount.toNumber();

    return (
      <p className="text-sm text-rose-500">
        I've been waved at{" "}
        <span className="inline-flex min-w-[30px] px-2 h-6 text-xs  items-center justify-center bg-white rounded-full border border-rose-200">
          {isLoading ? 0 : waveCountNumber}
        </span>{" "}
        time{waveCountNumber > 1 ? "s" : ""}!
      </p>
    );
  }

  return null;
};
