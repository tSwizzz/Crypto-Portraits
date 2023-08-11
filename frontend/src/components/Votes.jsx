/** @format */
import "./styles/Votes.css";

import React, { useEffect, useState } from "react";
import Submit from "./Submit.jsx";
import { contestState } from "./SmartContract.jsx";
import { displayNFTs } from "./SmartContract.jsx";

function Votes() {
   const [image1, setImage1] = useState(null);
   const [image2, setImage2] = useState(null);
   const [image3, setImage3] = useState(null);

   const [contestStatus, setContestStatus] = useState(false);

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

   return (
      <div className="votes-container">
         {contestStatus ? (
            <div className="nft-container">
               <h2 className="votes-header">
                  Select Your&nbsp;<span className="fav-word">Favorite...</span>
               </h2>
               <div className="img-container">
                  <img className="nft-img" src={image1} alt="NFT 1" />
                  <img className="nft-img" src={image2} alt="NFT 2" />
                  <img className="nft-img" src={image3} alt="NFT 3" />
               </div>
            </div>
         ) : (
            <div className="no-contest-msg">Contest has not started yet</div>
         )}
      </div>
   );
}

export default Votes;
