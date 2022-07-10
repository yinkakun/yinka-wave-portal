const main = async () => {
  const [owner, randomUser] = await hre.ethers.getSigners();
  const WaveContract = await hre.ethers.getContractFactory('WavePortal');
  const waveContract = await WaveContract.deploy();
  await waveContract.deployed();

  console.log('Contract deployed to:', waveContract.address);
  console.log('Contract deployed by:', owner.address);

  let waveCount = await waveContract.getWaveCount();

  const waveTxn1 = await waveContract.wave();
  await waveTxn1.wait();

  const waveTxn2 = await waveContract.wave();
  await waveTxn2.wait();

  const waveTxn3 = await waveContract.connect(randomUser).wave();
  await waveTxn3.wait();

  waveCount = await waveContract.getWaveCount();
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
