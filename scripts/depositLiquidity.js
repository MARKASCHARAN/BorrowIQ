const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const pool = await ethers.getContractAt(
    "LendingPool",
    "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
  );

  console.log("Depositing another 10 ETH for demo...");
  await pool.deposit({
    value: ethers.utils.parseEther("10"),
  });
  console.log("Deposit complete!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
