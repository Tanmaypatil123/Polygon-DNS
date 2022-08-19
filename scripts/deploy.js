const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("mortal");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register("Tanmay", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn.wait();
  console.log("Minted domain Tanmay.mortal");

  txn = await domainContract.setRecord("Tanmay", "Am I a Tanmay or a Mortal??");
  await txn.wait();
  console.log("Set record for Tanmay.mortal");

  const address = await domainContract.getAddress("Tanmay");
  console.log("Owner of domain Tanmay:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();