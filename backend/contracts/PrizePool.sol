pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract PrizePool {
    address public owner;
    address winner;
    address[] public allParticipants;

    uint[] nftIdArray;
    uint prizePool;
    uint endTime;

    bool beginContest;
    bool contestEnded;

    //if there is a tie, then all funds are withdrawable to participant
    //if not, then all funds in this mapping are sent to prizePool
    mapping(address => uint) potentialWithdrawBalance;

    constructor() {
        owner = msg.sender;
    }

    struct NFT {
        IERC721 nft;
        address owner;
        uint nftId;
        uint numOfVotes; //can maybe utilize this
        bool submitted; //participants can only submit 1 NFT per contest
    }
    mapping(address => NFT) public participants;

    mapping(address => bool) voters;
    mapping(address => uint) lockedEther; //voter must lock 3000 wei before allowed to vote; reduces rigging of votes.. right?

    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    modifier canSubmit(address nft, uint nftId) {
        require(
            !beginContest,
            "Contest has already begun. Submissions are not allowed"
        );
        require(
            IERC721(nft).getApproved(nftId) == address(this),
            "This contract is not approved to access this NFT. Please approve first."
        );
        require(
            IERC721(nft).ownerOf(nftId) == msg.sender,
            "You must submit an NFT you own"
        );
        require(
            msg.value == 1000 wei,
            "Please send exactly 1000 wei to be able to submit your NFT"
        );

        //Taken out for testing convenience / showcasing website
        //require(
        //!participants[msg.sender].submitted,
        //"You can only send 1 NFT per contest"
        //);
        _;
    }

    modifier canVote() {
        require(!contestEnded, "Contest has ended. No more votes are allowed");

        //Taken out for testing convenience / showcasing website
        //require(
        //    !voters[msg.sender],
        //    "You have already voted for a participant's NFT"
        //);
        require(
            msg.value == 3000 wei,
            "You must lock exactly 3000 wei to be able to vote"
        );

        //Taken out for testing convenience / showcasing website
        //require(
        //    !participants[msg.sender].submitted,
        //    "Contest participants are not allowed to vote"
        //);
        _;
    }

    modifier canWithdrawNFT(uint id) {
        require(
            contestEnded,
            "Please wait until the voting period is over to withdraw your NFT"
        );
        require(
            participants[msg.sender].nftId == id,
            "You must withdraw the NFT that you submitted, not a different one"
        );
        _;
    }

    modifier canWithdrawLockedEther() {
        require(
            contestEnded,
            "Please wait for the contest to end to withdraw your ether"
        );
        require(lockedEther[msg.sender] > 0, "No funds to withdraw");
        _;
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) public returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    function submitNFT(
        address nft,
        uint nftId
    ) external payable canSubmit(nft, nftId) {
        IERC721(nft).safeTransferFrom(msg.sender, address(this), nftId);

        //update data for NFT struct
        participants[msg.sender].owner = msg.sender;
        participants[msg.sender].nft = IERC721(nft);
        participants[msg.sender].nftId = nftId;
        participants[msg.sender].submitted = true;

        //update balances and tracking of participants
        potentialWithdrawBalance[msg.sender] += msg.value;
        allParticipants.push(msg.sender);
        
        nftIdArray.push(nftId);

        if (allParticipants.length == 3) {
            beginContest = true;
            endTime = block.timestamp + 1 days;
        }
    }

    function vote() external payable canVote {
        voters[msg.sender] = true;
        lockedEther[msg.sender] += msg.value;
        //update numOfVotes in struct next!!
    }

    //only the voters have funds in these
    function withdrawLockedEther() external canWithdrawLockedEther {
        uint balance = lockedEther[msg.sender];
        lockedEther[msg.sender] = 0;
        (bool sent, ) = payable(msg.sender).call{value: balance}("");
        require(sent, "Withdraw failed, try again please");
    }

    function withdrawPrizePool() external {
        require(msg.sender == winner, "You are not the winner");

        uint amount = prizePool;
        prizePool = 0;

        (bool sent, ) = payable(winner).call{value: amount}("");
        require(sent, "Withdraw failed, try again please");
    }

    //this is only callable if there was a tie. all submitters can withdraw their funds
    function withdrawAllFunds() external {
        require(
            contestEnded,
            "Please wait until the voting period is over to withdraw your funds"
        );
        require(
            winner == address(0),
            "You cannot withdraw your funds because the contest had a winner"
        );
        require(
            potentialWithdrawBalance[msg.sender] > 0,
            "No funds to withdraw"
        );

        uint amount = potentialWithdrawBalance[msg.sender];
        potentialWithdrawBalance[msg.sender] = 0;
        (bool sent, ) = payable(msg.sender).call{value: amount}("");
        require(sent, "Withdraw failed, try again");
    }

    function withdrawNFT(uint id) external canWithdrawNFT(id) {
        participants[msg.sender].nft.safeTransferFrom(
            address(this),
            msg.sender,
            participants[msg.sender].nftId
        );
    }

    //this basically only exists for the purpose of testing so I don't have to
    //wait for the contest to end every time it starts lol
    function end() external onlyOwner {
        //lets check if there is a winner or if there is a tie
        uint highestVotes = participants[allParticipants[0]].numOfVotes;

        for (uint k; k < allParticipants.length; k++) {
            if (participants[allParticipants[k]].numOfVotes > highestVotes) {
                winner = allParticipants[k];
                highestVotes = participants[allParticipants[k]].numOfVotes;
            } else if (
                participants[allParticipants[k]].numOfVotes == highestVotes
            ) {
                winner = address(0);
            }
        }

        //if winner exists, send funds to prizePool and give 10% to contract owner
        if (winner != address(0)) {
            for (uint k; k < allParticipants.length; k++) {
                prizePool += potentialWithdrawBalance[allParticipants[k]];
                potentialWithdrawBalance[allParticipants[k]] = 0;
            }
        }
    }

    function getAllParticipants() public view returns (address[] memory) {
        return allParticipants;
    }

    function getNFTIdArray() public view returns (uint[] memory) {
        return nftIdArray;
    }

    function getBeginContestValue() public view returns (bool) {
        return beginContest;
    }

    function getContestEndedValue() public view returns (bool) {
        return contestEnded;
    }
}

//function createNFTContest() internal {}
