const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with account:", deployer.address);

  const FungibleToken = await ethers.getContractFactory("FungibleToken");
  const token = await FungibleToken.deploy("MyToken", "MTK");

  console.log("FungibleToken address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
