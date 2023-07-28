/** @format */

const fs = require("fs/promises");
const hre = require("hardhat");

async function main() {
   const PrizePool = await hre.ethers.deployContract("PrizePool");
   await PrizePool.waitForDeployment();

   console.log(`Contract deployed to ${await PrizePool.getAddress()}`);

   const prizePoolAddress = await PrizePool.getAddress();
   const signer = await hre.ethers.getSigners();

   await writeDeploymentInfo(
      PrizePool,
      prizePoolAddress,
      "PrizePool.json",
      signer[0].address,
   );
}

async function writeDeploymentInfo(
   contract,
   prizePoolAddress,
   filename = "",
   signer,
) {
   const data = {
      contract: {
         address: prizePoolAddress,
         signerAddress: signer,
         abi: contract.interface.format(),
      },
   };

   const content = JSON.stringify(data, null, 2);
   await fs.writeFile(filename, content, { encoding: "utf-8" });
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
