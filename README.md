# NFT-Prize-Pool

A decentralized voting system where users can submit their NFTs to be voted by other users. The NFT with the most votes wins the prize pool money!

Description:
This is a decentralized voting platform where users can submit an NFT (image) that they have created into a timed voting pool with 2 other users.
The user with the most likes/votes on their NFT by the end of the voting period wins the prize pool money!

Rules:
User may only submit 1 NFT.
User must contribute a buy-in to the prize pool (1000 wei) to enter competition.
Voters must lock 3000 wei before casting vote. (This is to prevent/reduce rigging of votes). Withdrawable after voting period ends.
Total of 3 users per competition.

Details:
10% of prize pool goes to owner of contract. If a tie occurs, then there are no winners and all funds are withdrawable to participants. NFTs will be held in the contract and withdrawable after voting period ends.

This project, to break it down simply, is really just an art contest regardless of whether or not the art they submit is an NFT or not. In this case, it must be an NFT for the purpose of showcasing my ability to utilize them in smart contracts. Concerns like the rigging of votes, sending of NFTs that were minted by someone else, etc, are edge-cases that are out of my reach.

Installation Guide:
Clone repo to local machine
In terminal:
  1) cd backend
  2) npm install
  3) npx hardhat node
  4) Open new terminal
  5) cd frontend
  6) npm install
  7) npm run dev
  8) Check the site out!

  
