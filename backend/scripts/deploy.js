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

   //SampleNFT deployment --> //This contract exists for the purpose of minting my own NFTs upon deployment to use to test the website.
   //Anyone can use these to see how the site works!
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

   //These are nfts that will be minted upon deployment and sent to one wallet for testing
   const nftArray = [
      "ipfs://QmRB8vUVjUfCWNGQCFg9VvNxQP1QVBX3Aibx7uPQHCrKkq",
      "ipfs://QmRLoJidkk1CJTzgFzYNuRM8HovGzFfXfoH4ghBbHKQ8um",
      "ipfs://QmSLdumK3nZ2RdyPYu7cTfzEhf4bBXezfRzeb7Lx5oF4uS",
   ];
   const myAddress = prizePoolSigner[0].address; //0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, this is the first addr on the hardhat test network

   for (let k = 0; k < nftArray.length; k++) {
      await SampleNFT.mint(myAddress, k + 1, nftArray[k]);
   }
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
