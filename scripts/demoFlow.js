const { ethers } = require("hardhat");

// delay helper
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {

  console.log("🚀 Starting BorrowIQ Demo Flow\n");

  const [user] = await ethers.getSigners();

  console.log("User wallet:", user.address);

  const registry = await ethers.getContractAt(
    "CreditScoreRegistry",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );

  const pool = await ethers.getContractAt(
    "LendingPool",
    "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
  );

  const loanManager = await ethers.getContractAt(
    "LoanManager",
    "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
  );


  console.log("\nSetting credit score...");
  await registry.updateScore(user.address, 80);
  console.log("Credit score set to 80");

  await delay(2000);

  console.log("\nDepositing liquidity to pool...");
  await pool.deposit({
    value: ethers.utils.parseEther("5"),
  });
  console.log("5 ETH deposited");

  await delay(2000);


  console.log("\nRequesting loan...");
  await loanManager.requestLoan(
    ethers.utils.parseEther("1")
  );
  console.log("Loan issued: 1 ETH");

  await delay(2000);


  console.log("\nRepaying loan...");
  await loanManager.repayLoan({
    value: ethers.utils.parseEther("1.07"),
  });
  console.log("Loan repaid successfully");

  console.log("\n🎉 BorrowIQ demo flow complete!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});