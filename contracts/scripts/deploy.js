const main = async () => {
  const WaveContract = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await WaveContract.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log("Error:", error);
    process.exit(1);
  }
};

runMain();
