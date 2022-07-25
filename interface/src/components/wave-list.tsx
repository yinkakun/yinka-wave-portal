import { useContractRead } from "wagmi";
import Marquee from "react-fast-marquee";
import { formatDistanceToNow } from "date-fns";
import { BigNumber } from "ethers";
import formatAddress from "../utils/format-address";
import { contractAddressAndAbi } from "../constants";

interface IWave {
  waver: string;
  message: string;
  timestamp: BigNumber;
}

const WaveList = () => {
  const { data: waves } = useContractRead({
    ...contractAddressAndAbi,
    functionName: "getAllWaves",
    watch: true,
  });

  if (waves && waves.length > 0) {
    return (
      <Marquee gradient={false} pauseOnHover speed={120} className="flex mt-6">
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
        <span>{formatAddress(waver)}</span>
        <span className="capitalize">{formattedTime} ago</span>
      </div>
    </div>
  );
};

export default WaveList;
