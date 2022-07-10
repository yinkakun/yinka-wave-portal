const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log('Contract deployed by:', deployer.address);
  console.log('Deployer account balance:', accountBalance.toString());

  const WaveContract = await hre.ethers.getContractFactory('WavePortal');
  const waveContract = await WaveContract.deploy();
  await waveContract.deployed();

  console.log('Contract deployed to:', waveContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log('Error:', error);
    process.exit(1);
  }
};

runMain();
