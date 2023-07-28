/** @format */

const fs = require("fs/promises");
const hre = require("hardhat");
const path = require("path");

async function main() {
   //PrizePool deployment
   const PrizePool = await hre.ethers.deployContract("PrizePool");
   await PrizePool.waitForDeployment();

   const prizePoolAddress = await PrizePool.getAddress();
   const prizePoolSigner = await hre.ethers.getSigners();

   await writeDeploymentInfo(
      PrizePool,
      prizePoolAddress,
      "PrizePool.json",
      prizePoolSigner[0].address,
   );

   //SampleNFT deployment
   const SampleNFT = await hre.ethers.deployContract("SampleNFT");
   await SampleNFT.waitForDeployment();

   const sampleNFTAddress = await SampleNFT.getAddress();
   const sampleNFTSigner = await hre.ethers.getSigners();

   await writeDeploymentInfo(
      SampleNFT,
      sampleNFTAddress,
      "SampleNFT.json",
      sampleNFTSigner[0].address,
   );
}

async function writeDeploymentInfo(contract, address, filename = "", signer) {
   const data = {
      contract: {
         address: address,
         signerAddress: signer,
         abi: contract.interface.format(),
      },
   };

   const content = JSON.stringify(data, null, 2);

   const abiDir = path.join(__dirname, "abi");
   await fs.mkdir(abiDir, { recursive: true });

   const filePath = path.join(abiDir, filename);
   await fs.writeFile(filePath, content, { encoding: "utf-8" });
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
