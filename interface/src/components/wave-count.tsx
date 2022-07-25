import { useContractRead } from "wagmi";
import { contractAddressAndAbi } from "../constants";

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

export default WaveCount;
