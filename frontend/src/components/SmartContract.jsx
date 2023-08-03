/** @format */
import { ethers } from "ethers";
const provider = new ethers.BrowserProvider(window.ethereum);
let signer;

let prizePoolContract;
const prizePoolAddress = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";
const prizePoolAbi = [
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

let nftContract;
const nftAddress = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";
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

export async function approveNFT() {
   await getAccess();
   const id = document.getElementById("token-id-approve").value;

   await nftContract
      .approve(prizePoolAddress, id)
      .then(() => alert("Your NFT is now approved!"))
      .catch((error) => {
         if (error.data) alert(error.data.message);
         else alert(error);
      });
}

export async function submit() {
   await getAccess();
   const id = document.getElementById("token-id").value;
   const amount = document.getElementById("buy-in-amount").value;

   await prizePoolContract
      .submitNFT(nftAddress, id, { value: amount })
      .then(() => {
         alert("Your NFT has been submitted to the contest! Stay tuned!");
      })
      .catch((error) => {
         if (error.data.message) {
            alert(error.data.message);
         } else {
            alert(error);
         }
      });

   //if ((await nftContract.balanceOf(prizePoolAddress)) == 3) {
   //   //begins contest
   //}
}
