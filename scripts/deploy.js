const { ethers } = require("hardhat");

async function main() {

  console.log("Starting BorrowIQ deployment...\n");

  const [deployer] = await ethers.getSigners();

  console.log("Deploying with:", deployer.address);

  // ----------------------------
  // Deploy CreditScoreRegistry
  // ----------------------------

  const CreditScoreRegistry = await ethers.getContractFactory("CreditScoreRegistry");
  const creditRegistry = await CreditScoreRegistry.deploy();

  await creditRegistry.waitForDeployment();

  const creditRegistryAddress = await creditRegistry.getAddress();

  console.log("CreditScoreRegistry:", creditRegistryAddress);


  // ----------------------------
  // Deploy InterestRateModel
  // ----------------------------

  const InterestRateModel = await ethers.getContractFactory("InterestRateModel");
  const rateModel = await InterestRateModel.deploy();

  await rateModel.waitForDeployment();

  const rateModelAddress = await rateModel.getAddress();

  console.log("InterestRateModel:", rateModelAddress);


  // ----------------------------
  // Deploy LendingPool
  // ----------------------------

  const LendingPool = await ethers.getContractFactory("LendingPool");
  const lendingPool = await LendingPool.deploy();

  await lendingPool.waitForDeployment();

  const lendingPoolAddress = await lendingPool.getAddress();

  console.log("LendingPool:", lendingPoolAddress);


  // ----------------------------
  // Deploy LoanManager
  // ----------------------------

  const LoanManager = await ethers.getContractFactory("LoanManager");

  const loanManager = await LoanManager.deploy(
    creditRegistryAddress,
    rateModelAddress,
    lendingPoolAddress
  );

  await loanManager.waitForDeployment();

  const loanManagerAddress = await loanManager.getAddress();

  console.log("LoanManager:", loanManagerAddress);


  // ----------------------------
  // Configure protocol
  // ----------------------------
console.log("\nConfiguring BorrowIQ protocol...");

const pool = await ethers.getContractAt(
  "LendingPool",
  lendingPoolAddress,
  deployer
);

const ownerBefore = await pool.owner();
console.log("Pool owner before transfer:", ownerBefore);

const data = pool.interface.encodeFunctionData(
  "transferOwnership",
  [loanManagerAddress]
);

const tx = await deployer.sendTransaction({
  to: lendingPoolAddress,
  data: data,
  gasLimit: 200000
});

await tx.wait();

const ownerAfter = await pool.owner();
console.log("Pool owner after transfer:", ownerAfter);

console.log("\n🚀 BorrowIQ deployment complete!");


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});