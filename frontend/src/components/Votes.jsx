/** @format */
import "./styles/Votes.css";
import pepe1 from "./images/pepe1.jpg";
import pepe2 from "./images/pepe2.jpg";
import pepe3 from "./images/pepe3.jpg";

import React, { useEffect, useState } from "react";
import Submit from "./Submit.jsx";
import { contestState, voteNFT, endContest } from "./SmartContract.jsx";
import { displayNFTs } from "./SmartContract.jsx";
//import { lock } from "ethers";

function Votes({ contract }) {
   const [image1, setImage1] = useState(null);
   const [image2, setImage2] = useState(null);
   const [image3, setImage3] = useState(null);

   const [contestStatus, setContestStatus] = useState(false);
   const [lockedEtherAmount, setLockedEtherAmount] = useState("");
   const [nftIdNum, setNftIdNum] = useState("");

   const [voted, setVoted] = useState(false);
   const [endContestValue, setEndContestValue] = useState(false);

   useEffect(() => {
      fetchContestValue();
   }, []);

   const fetchContestValue = async () => {
      try {
         let status = await contestState();
         if (status === true) {
            setContestStatus(true);
            handleDisplayNFTs();
         }
      } catch (error) {
         alert(error);
      }
   };

   const handleDisplayNFTs = async () => {
      try {
         let imageSrcArr = await displayNFTs();
         setImage1(imageSrcArr[0]);
         setImage2(imageSrcArr[1]);
         setImage3(imageSrcArr[2]);
      } catch (error) {
         alert(error);
      }
   };

   //prompts when user votes for an NFT
   const handleVote = async () => {
      try {
         if (lockedEtherAmount == 3000) {
            await voteNFT();
            setVoted(true);
         } else {
            alert("Please enter 3000 wei");
         }
      } catch {}
   };

   const handleEndContest = async () => {
      await endContest();
      setEndContestValue(true);
      setContestStatus(false);
   };

   const handleLockedEtherAmount = (event) => {
      setLockedEtherAmount(event.target.value);
   };

   const handleNftIdNum = (event) => {
      setNftIdNum(event.target.value);
   };

   return (
      <div className="votes-container">
         {contestStatus && !endContestValue ? (
            <div>
               <div className="nft-container">
                  <h2 className="votes-header">
                     Vote Your&nbsp;
                     <span className="fav-word">Favorite...</span>
                  </h2>
                  <div className="img-container">
                     <div className="img-id-text">
                        <p className="image-id">ID: 1</p>
                        <img className="nft-img" src={pepe1} alt="NFT 1" />
                     </div>
                     <div className="img-id-text">
                        <p className="image-id">ID: 2</p>
                        <img className="nft-img" src={pepe2} alt="NFT 2" />
                     </div>
                     <div className="img-id-text">
                        <p className="image-id">ID: 3</p>
                        <img className="nft-img" src={pepe3} alt="NFT 3" />
                     </div>
                  </div>
               </div>
               <div className="lock-ether-container">
                  <input
                     type="number"
                     id="locked-ether-input"
                     placeholder="3000 wei"
                     value={lockedEtherAmount}
                     onChange={handleLockedEtherAmount}
                  />
                  <br />
                  <input
                     type="number"
                     id="nft-id-num"
                     placeholder="NFT ID"
                     value={nftIdNum}
                     onChange={handleNftIdNum}
                  />
                  <br />
                  <button className="vote-btn" onClick={handleVote}>
                     Vote
                  </button>
                  <br />
               </div>

               <div className="end-contest-container">
                  <button
                     className="end-contest-btn"
                     onClick={handleEndContest}
                  >
                     End Contest
                  </button>
               </div>

               {voted && (
                  <>
                     <div className="voted-msg">
                        Thanks for voting! Stay tuned for the results!
                     </div>
                  </>
               )}
            </div>
         ) : endContestValue ? (
            <div className="results-container">hi</div>
         ) : (
            <div className="nft-container">
               <h2 className="votes-header">DEMO</h2>
               <div className="img-container">
                  <img className="nft-img" src={pepe1} alt="NFT 1" />
                  <img className="nft-img" src={pepe2} alt="NFT 2" />
                  <img className="nft-img" src={pepe3} alt="NFT 3" />
               </div>
            </div>
         )}
      </div>
   );
}

export default Votes;
