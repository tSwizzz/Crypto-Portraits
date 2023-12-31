/** @format */
import "./styles/Votes.css";
import pepe1 from "./images/pepe1.jpg";
import pepe2 from "./images/pepe2.jpg";
import pepe3 from "./images/pepe3.jpg";
import githubLogo from "./images/github-logo.png";

import React, { useEffect, useState } from "react";
import {
   contestState,
   voteNFT,
   endContest,
   getWinner,
   prizePoolWithdraw,
   nftWithdraw,
   lockedEtherWithdraw,
   withdrawSubmittedEther,
} from "./SmartContract.jsx";
import { displayNFTs } from "./SmartContract.jsx";
//import { lock } from "ethers";

function Votes() {
   const [image1, setImage1] = useState(null);
   const [image2, setImage2] = useState(null);
   const [image3, setImage3] = useState(null);

   const [contestStatus, setContestStatus] = useState(false);
   const [lockedEtherAmount, setLockedEtherAmount] = useState("");
   const [nftIdNum, setNftIdNum] = useState("");

   const [voted, setVoted] = useState(false);
   const [endContestValue, setEndContestValue] = useState(false);
   const [winner, setWinner] = useState("");

   const [showDemoResultsPage, setShowDemoResultsPage] = useState(false);

   useEffect(() => {
      fetchContestValue();
   }, []);

   //grab the state of the contest (bool)
   const fetchContestValue = async () => {
      try {
         let status = await contestState();
         if (status === true) {
            setContestStatus(true);
            handleDisplayNFTs();
         }
      } catch {}
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

   const handleWinner = async () => {
      let winner = await getWinner();
      if (winner === "0x0000000000000000000000000000000000000000")
         setWinner("No Winner (Tie)");
   };

   const handleEndContest = async () => {
      await endContest();
      setEndContestValue(true);
      setContestStatus(false);
      handleWinner();
   };

   //if there is a winner, they may withdraw the prize pool
   const handlePrizePoolWithdraw = async () => {
      try {
         await prizePoolWithdraw();
      } catch (error) {
         alert(error);
      }
   };

   //contestant may withdraw NFT now that contest is over
   const handleNFTWithdraw = async () => {
      try {
         await nftWithdraw();
      } catch (error) {
         alert(error);
      }
   };

   //voters can withdraw their locked ether
   const handleLockedEtherWithdraw = async () => {
      try {
         await lockedEtherWithdraw();
      } catch (error) {
         alert(error);
      }
   };

   //contestants can withdraw the ether they submitted to the contest only if a tie occurred
   const handleWithdrawSubmittedEther = async () => {
      try {
         await withdrawSubmittedEther();
      } catch (error) {
         alert(error);
      }
   };

   const handleShowDemoResultsPage = () => {
      setShowDemoResultsPage(true);
   };

   const handleLockedEtherAmount = (event) => {
      setLockedEtherAmount(event.target.value);
   };

   const handleNftIdNum = (event) => {
      setNftIdNum(event.target.value);
   };

   return (
      <>
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
                           <img className="nft-img" src={image1} alt="NFT 1" />
                        </div>
                        <div className="img-id-text">
                           <p className="image-id">ID: 2</p>
                           <img className="nft-img" src={image2} alt="NFT 2" />
                        </div>
                        <div className="img-id-text">
                           <p className="image-id">ID: 3</p>
                           <img className="nft-img" src={image3} alt="NFT 3" />
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
                     <button
                        className="end-contest-btn"
                        onClick={handleEndContest}
                     >
                        End Contest
                     </button>
                     <br />
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
               <>
                  <div className="results-main-container">
                     <div className="head">
                        <h1 className="head-text">Winner: {winner}</h1>
                     </div>
                     <div className="results-container">
                        <div className="result">
                           <h3>Withdraw Prize Pool</h3>
                           <div className="result-info">
                              <p>Winner May Withdraw Prize Pool</p>
                              <button
                                 className="result-button"
                                 onClick={handlePrizePoolWithdraw}
                              >
                                 Withdraw
                              </button>
                           </div>
                        </div>
                        <div className="result">
                           <h3>Withdraw NFT</h3>
                           <div className="result-info">
                              <p>Contestant May Now Withdraw NFT</p>
                              <div className="nft-container">
                                 <input
                                    className="result-input"
                                    type="number"
                                    id="token-id"
                                    placeholder="Token ID"
                                 />
                                 <button
                                    className="result-button"
                                    onClick={handleNFTWithdraw}
                                 >
                                    Withdraw
                                 </button>
                              </div>
                           </div>
                        </div>
                        <div className="result">
                           <h3>Withdraw Locked Ether</h3>
                           <div className="result-info">
                              <p>Voters May Withdraw Locked Ether</p>
                              <button
                                 className="result-button"
                                 onClick={handleLockedEtherWithdraw}
                              >
                                 Withdraw
                              </button>
                           </div>
                        </div>
                        <div className="result">
                           <h3>Withdraw Submitted Ether </h3>
                           <div className="result-info">
                              <p>
                                 Contestant May Withdraw Ether Contribution (Tie
                                 Only)
                              </p>
                              <button
                                 className="result-button"
                                 onClick={handleWithdrawSubmittedEther}
                              >
                                 Withdraw
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>{" "}
               </>
            ) : !showDemoResultsPage ? (
               <>
                  <div className="nft-container">
                     <h2 className="votes-header">DEMO</h2>
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
                     <div className="results-demo-container">
                        <button
                           className="results-demo-btn"
                           onClick={handleShowDemoResultsPage}
                        >
                           Results Page Demo
                        </button>
                     </div>
                  </div>
               </>
            ) : (
               showDemoResultsPage && (
                  <>
                     <div className="results-main-container">
                        <div className="head">
                           <h1
                              style={{
                                 marginBottom: "50px",
                                 marginTop: "-60px",
                              }}
                           >
                              DEMO RESULTS
                           </h1>
                           <h1 className="head-text">Winner: N/A</h1>
                        </div>
                        <div className="results-container">
                           <div className="result">
                              <h3>Withdraw Prize Pool</h3>
                              <div className="result-info">
                                 <p>Winner May Withdraw Prize Pool</p>
                                 <button
                                    className="result-button"
                                    style={{
                                       cursor: "not-allowed",
                                    }}
                                 >
                                    Withdraw
                                 </button>
                              </div>
                           </div>
                           <div className="result">
                              <h3>Withdraw NFT</h3>
                              <div className="result-info">
                                 <p>Contestant May Now Withdraw NFT</p>
                                 <button
                                    className="result-button"
                                    style={{
                                       cursor: "not-allowed",
                                    }}
                                 >
                                    Withdraw
                                 </button>
                              </div>
                           </div>
                           <div className="result">
                              <h3>Withdraw Locked Ether</h3>
                              <div className="result-info">
                                 <p>Voters May Withdraw Locked Ether</p>
                                 <button
                                    className="result-button"
                                    style={{
                                       cursor: "not-allowed",
                                    }}
                                 >
                                    Withdraw
                                 </button>
                              </div>
                           </div>
                           <div className="result">
                              <h3>Withdraw Submitted Ether </h3>
                              <div className="result-info">
                                 <p>
                                    Contestant May Withdraw Ether Contribution
                                    (Tie Only)
                                 </p>
                                 <button
                                    className="result-button"
                                    style={{
                                       cursor: "not-allowed",
                                    }}
                                 >
                                    Withdraw
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>{" "}
                  </>
               )
            )}
         </div>

         <div className="divider4"></div>

         <footer className="footer-container">
            <a
               href="https://github.com/tSwizzz/Crypto-Portraits"
               className="github-link"
               target="_blank"
            >
               <img
                  src={githubLogo}
                  alt="GitHub Logo"
                  className="github-logo"
               />
               Developed by Edward Ghambari
            </a>
         </footer>
      </>
   );
}

export default Votes;
