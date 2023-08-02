/** @format */
import { ethers } from "ethers";

let contract;
let signer;
const provider = new ethers.BrowserProvider(window.ethereum);
const address = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";
const abi = [
   "constructor() nonpayable",
   "function allParticipants(uint256) view returns (address)",
   "function beginContestValue() view returns (bool)",
   "function contestEndedValue() view returns (bool)",
   "function end()",
   "function onERC721Received(address operator, address from, uint256 tokenId, bytes data) returns (bytes4)",
   "function owner() view returns (address)",
   "function submitNFT(address nft, uint256 nftId) payable",
   "function vote() payable",
   "function withdrawAllFunds()",
   "function withdrawLockedEther()",
   "function withdrawNFT(uint256 id)",
   "function withdrawOwnersCut()",
   "function withdrawPrizePool()",
];

export const connect = async () => {
   await provider.send("eth_requestAccounts", []);
   return getContract();
};

export const getContract = async () => {
   signer = await provider.getSigner();
   contract = new ethers.Contract(address, abi, signer);
   return { signer: signer, contract: contract };
};

export const getContestStatus = async () => {
   await getContract();
   const value = contract.beginContestValue();
   return value;
};
