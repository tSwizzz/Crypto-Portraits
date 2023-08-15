/** @format */
import "./styles/Votes.css";
import pepe1 from "./images/pepe1.jpg";
import pepe2 from "./images/pepe2.jpg";
import pepe3 from "./images/pepe3.jpg";

import React, { useEffect, useState } from "react";
import Submit from "./Submit.jsx";
import { contestState, voteNFT } from "./SmartContract.jsx";
import { displayNFTs } from "./SmartContract.jsx";
//import { lock } from "ethers";

function Votes({ contract }) {
   const [image1, setImage1] = useState(null);
   const [image2, setImage2] = useState(null);
   const [image3, setImage3] = useState(null);

   const [contestStatus, setContestStatus] = useState(false);
   const [lockedEtherAmount, setLockedEtherAmount] = useState("");
   const [voted, setVoted] = useState(false);

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

   const handleLockedEtherAmount = (event) => {
      setLockedEtherAmount(event.target.value);
   };

   return (
      <div className="votes-container">
         {/* checks to see if 3 nfts have been sent to contract for contest to start. 
         if not, then the 'demo' page will show*/}
         {contestStatus ? (
            <div>
               <div className="nft-container">
                  <h2 className="votes-header">
                     Vote Your&nbsp;
                     <span className="fav-word">Favorite...</span>
                  </h2>
                  <a className="img-container" href="#" onClick={handleVote}>
                     <img className="nft-img" src={image1} alt="NFT 1" />
                     <img className="nft-img" src={image2} alt="NFT 2" />
                     <img className="nft-img" src={image3} alt="NFT 3" />
                  </a>
               </div>
               <div className="lock-ether-container">
                  <input
                     type="number"
                     id="locked-ether-input"
                     placeholder="Enter 3000"
                     value={lockedEtherAmount}
                     onChange={handleLockedEtherAmount}
                  />
               </div>
               {voted && (
                  <>
                     <div className="voted-msg">
                        Thanks for voting! Stay tuned for the results!
                     </div>
                  </>
               )}
            </div>
         ) : (
            <>
               <div className="nft-container">
                  <h2 className="votes-header">DEMO</h2>
                  <div className="img-container">
                     <img className="nft-img" src={pepe1} alt="NFT 1" />
                     <img className="nft-img" src={pepe2} alt="NFT 2" />
                     <img className="nft-img" src={pepe3} alt="NFT 3" />
                  </div>
               </div>
            </>
         )}
      </div>
   );
}

export default Votes;
