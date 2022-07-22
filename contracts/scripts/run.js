const main = async () => {
  const WaveContract = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await WaveContract.deploy({
    value: hre.ethers.utils.parseEther("0.05"),
  });
  await waveContract.deployed();
  console.log("Contract deployed to:", waveContract.address);

  let currentBalance;
  currentBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Balance:", hre.ethers.utils.formatEther(currentBalance));

  // send wave
  const waveTxn1 = await waveContract.wave("Golf Wang");
  await waveTxn1.wait();

  // send wave
  const waveTxn2 = await waveContract.wave("Can we get some more waves?");
  await waveTxn2.wait();

  // send wave
  const waveTxn3 = await waveContract.wave("I don't like to follow the rules");
  await waveTxn3.wait();

  // send wave
  const waveTxn4 = await waveContract.wave("That's just who I am");
  await waveTxn4.wait();

  currentBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Balance:", hre.ethers.utils.formatEther(currentBalance));
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
