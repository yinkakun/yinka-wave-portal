import { useAccount, useNetwork } from "wagmi";

const useIsSupportedChain = () => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  const isSupportedChain = isConnected && !chain?.unsupported;

  return {
    isSupportedChain,
  };
};

export default useIsSupportedChain;
