/** @format */

import React from "react";
import "./styles/Home.css";
import baycImage from "./images/bayc.jpg";
import { Link } from "react-router-dom";
import githubLogo from "./images/github-logo.png";
import degodImage from "./images/degod.jpg";

function Home() {
   return (
      <>
         <div className="home-container">
            <h1 className="home-title">
               Decentralized Voting? NFTs? Wannabe gambling website? Welcome to
               NFT Prize Pool!
            </h1>
            <p className="home-body">
               Submit your NFT art against 2 other competitors and stand a
               chance to win the prize pool cash and triple your money!
            </p>
            <div className="nft-pic">
               <img src={baycImage} />
            </div>
            <Link to="./submit-nft">
               <button className="submit-btn">Submit Your NFT Here</button>
            </Link>
         </div>

         <div className="divider"></div>

         <div className="info-container">
            <div className="info-nft-image">
               <img src={degodImage} />
            </div>
            <div className="info-text-container">
               <p className="info-text">
                  Are you a passionate artist wanting to score some{" "}
                  <span className="big-bucks-text">Big Bucks</span>? Look no
                  further! At{" "}
                  <span className="info-title-text">NFT Prize Pool</span>, we're
                  on a mission to convert that{" "}
                  <span className="useless-text">useless fiat currency</span>{" "}
                  into some{" "}
                  <span className="ether-tokens-text">juicy ether tokens</span>.
                  We invite artists from all corners of the globe to share their
                  unique creations and compete for a chance to win some cash!
               </p>
            </div>
         </div>

         <div className="divider"></div>

         <div className="info2-container">
            <div className="info2-text-container">
               <p className="info2-text"></p>
            </div>
            <div className="info2-nft-image"></div>
         </div>
         <footer className="footer-container">
            <a href="https://github.com/tSwizzz" className="github-link">
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

export default Home;
