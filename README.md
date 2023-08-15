<!-- @format -->

# NFT-Prize-Pool

Description:
This is a decentralized voting platform where users can submit an NFT that they have created into a timed voting pool with 2 other users.
The user with the most likes/votes on their NFT by the end of the voting period wins the prize pool money!

Rules:
Contestant must pay 1000 wei contribution to prize pool.
Voters must lock 3000 wei before voting. (Reduces rigging?). Withdrawable after voting period ends.
Total of 3 users per competition.

Details:
If a tie occurs, then there are no winners and all funds are withdrawable to participants.
NFTs will be held in the contract and withdrawable after voting period ends.
Upon deployment, 3 NFTs will be minted to the first signer address on the Hardhat network (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266). You can see how the website works by submitting these NFTs yourself.

Guide: Have MetaMask installed.

Open terminal:

1. cd backend
2. npm install
3. npx hardhat node
4. open new terminal on the side (still in backend)
5. npx hardhat run --network localhost ./scripts/deploy.js
6. cd ../ (exit backend)
7. cd frontend
8. npm install
9. npm run dev
10. copy 'Local' link and paste in URL
11. Go crazy

*This project is really just an art contest.  
*Vote rigging / cheating are edge-cases that are out of my reach. I'm only human.
