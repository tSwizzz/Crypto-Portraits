/** @format */
import { ethers } from "ethers";
const provider = new ethers.BrowserProvider(window.ethereum);
let signer;

let prizePoolContract;
const prizePoolAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const prizePoolAbi = [
   "constructor() nonpayable",
   "function allParticipants(uint256) view returns (address)",
   "function end()",
   "function getAllParticipants() view returns (address[])",
   "function getBeginContestValue() view returns (bool)",
   "function getContestEndedValue() view returns (bool)",
   "function getNFTIdArray() view returns (uint256[])",
   "function getPrizePoolValue() view returns (uint256)",
   "function getWinner() view returns (address)",
   "function onERC721Received(address operator, address from, uint256 tokenId, bytes data) returns (bytes4)",
   "function owner() view returns (address)",
   "function participants(address) view returns (address nft, address owner, uint256 nftId, uint256 numOfVotes, bool submitted)",
   "function submitNFT(address nft, uint256 nftId) payable",
   "function vote(uint256 id) payable",
   "function withdrawAllFunds()",
   "function withdrawLockedEther()",
   "function withdrawNFT(uint256 id)",
   "function withdrawPrizePool()",
];

let nftContract;
const nftAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const nftAbi = [
   "constructor() nonpayable",
   "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
   "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)",
   "event BatchMetadataUpdate(uint256 _fromTokenId, uint256 _toTokenId)",
   "event MetadataUpdate(uint256 _tokenId)",
   "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",
   "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
   "function approve(address to, uint256 tokenId)",
   "function balanceOf(address owner) view returns (uint256)",
   "function getApproved(uint256 tokenId) view returns (address)",
   "function isApprovedForAll(address owner, address operator) view returns (bool)",
   "function mint(address _to, uint256 _tokenId, string _uri)",
   "function name() view returns (string)",
   "function owner() view returns (address)",
   "function ownerOf(uint256 tokenId) view returns (address)",
   "function renounceOwnership()",
   "function safeTransferFrom(address from, address to, uint256 tokenId)",
   "function safeTransferFrom(address from, address to, uint256 tokenId, bytes data)",
   "function setApprovalForAll(address operator, bool approved)",
   "function supportsInterface(bytes4 interfaceId) view returns (bool)",
   "function symbol() view returns (string)",
   "function tokenURI(uint256 tokenId) view returns (string)",
   "function transferFrom(address from, address to, uint256 tokenId)",
   "function transferOwnership(address newOwner)",
];

export const connect = async () => {
   await provider.send("eth_requestAccounts", []);
   return getAccess();
};

//access to contract
export const getAccess = async () => {
   signer = await provider.getSigner();
   prizePoolContract = new ethers.Contract(
      prizePoolAddress,
      prizePoolAbi,
      signer,
   );
   nftContract = new ethers.Contract(nftAddress, nftAbi, signer);

   return { signer: signer, contract: prizePoolContract };
};

//handles submitting NFT to contract
export async function submit() {
   await getAccess();
   const id = document.getElementById("token-id").value;
   const amount = document.getElementById("buy-in-amount").value;

   await nftContract.approve(prizePoolAddress, id);
   await prizePoolContract
      .submitNFT(nftAddress, id, { value: amount })
      .catch((error) => {
         if (error.data.message) {
            alert(error.data.message);
         } else {
            alert(error);
         }
      });
}

//returns a bool value to check whether or not the contest has started
export async function contestState() {
   await getAccess();
   let value = await prizePoolContract.getBeginContestValue();
   return value;
}

//displays the 3 NFTs to the screen on the votes page
export async function displayNFTs() {
   await getAccess();
   let idArray = await prizePoolContract.getNFTIdArray();

   let nftArray = [];
   for (let k = 0; k < 3; k++) {
      const uri = await nftContract.tokenURI(idArray[k]);
      const link = getUrl(uri);
      nftArray.push(link);
   }
   return nftArray;
}

//handles user voting and locks the necessary ether required to vote
export async function voteNFT() {
   await getAccess();
   const amount = document.getElementById("locked-ether-input").value;
   const nftId = document.getElementById("nft-id-num").value;

   await prizePoolContract.vote(nftId, { value: amount }).catch((error) => {
      if (error.data.message) {
         alert(error.data.message);
      } else {
         alert(error);
      }
   });

   //const participantAddressesArr = await prizePoolContract.getAllParticipants();
   //
   //for (let i = 0; i < participantAddressesArr.length; i++) {
   //   const participantAddr = participantAddressesArr[i];
   //
   //   const participantData = await prizePoolContract.participants(
   //      participantAddr,
   //   );
   //   setTimeout(() => {
   //      console.log("Vote Count:", participantData[3].toString());
   //   }, 12000);
   //}
}

export async function endContest() {
   await getAccess();
   await prizePoolContract.end();
}

export async function getWinner() {
   await getAccess();
   let winner = await prizePoolContract.getWinner();
   return winner;
}

export async function prizePoolWithdraw() {
   await getAccess();
   await prizePoolContract.withdrawPrizePool();
}

export async function nftWithdraw() {
   await getAccess();
   const id = document.getElementById("token-id").value;

   await prizePoolContract.withdrawNFT(id);
}

export async function lockedEtherWithdraw() {
   await getAccess();
   await prizePoolContract.withdrawLockedEther();
}

export async function withdrawSubmittedEther() {
   await getAccess();
   await prizePoolContract.withdrawAllFunds();
}
function getUrl(ipfs) {
   return "http://localhost:8080/ipfs" + ipfs.split(":")[1].slice(1);
}
