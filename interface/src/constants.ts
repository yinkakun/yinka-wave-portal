import wavePortalAbi from "./abi/wave-portal.json";

export const RINKEBY_CHAIN_ID = 4;

export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

export const contractAddressAndAbi = {
  addressOrName: CONTRACT_ADDRESS,
  contractInterface: wavePortalAbi.abi,
};
