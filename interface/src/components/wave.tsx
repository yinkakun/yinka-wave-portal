import { useSigner, useContract } from "wagmi";
import wavePortalAbi from "../abi/wave-portal.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const Wave = () => {
  const { data: signer } = useSigner();

  const contractAddressAndAbi = {
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: wavePortalAbi.abi,
  };

  const wavePortalContract = useContract({
    ...contractAddressAndAbi,
    signerOrProvider: signer,
  });

  const getWaveCount = async () => {
    const count = await wavePortalContract.getWaveCount();
    console.log("count", count);
    return count.toNumber();
  };

  const wave = async (message: string) => {
    const waveTx = await wavePortalContract.wave(message);
    console.log("Mining:", waveTx.hash);

    await waveTx.wait();
    console.log("Mined:", waveTx.hash);

    const count = await getWaveCount();
    console.log("count", count);
  };

  const getAllWaves = async () => {
    let waves: any[] = [];
    const data = await wavePortalContract.getAllWaves();

    await data?.forEach((wave: any) => {
      waves.push({
        address: wave.waver,
        message: wave.message,
        timestamp: new Date(wave.timestamp * 1000),
      });
    });

    return waves;
  };

  return (
    <div className="flex gap-4 container items-center justify-center mx-auto grow">
      <button onClick={getWaveCount} className="p-2 bg-rose-300">
        Get Wave Count
      </button>
      <button
        onClick={() => wave("I'm wolf")}
        className="border bg-rose-500 p-2"
      >
        Wave
      </button>
      <button onClick={getAllWaves}>Get All Waves</button>
    </div>
  );
};

export default Wave;
