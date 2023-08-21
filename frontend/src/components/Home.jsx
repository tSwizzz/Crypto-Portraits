/** @format */

import React from "react";
import "./styles/Home.css";
import baycImage from "./images/bayc.jpg";
import { Link } from "react-router-dom";
import githubLogo from "./images/github-logo.png";
import degodImage from "./images/degod.jpg";
import { useState, useEffect } from "react";

function Home() {
   const [infoContainerStyle, setInfoContainerStyle] = useState(false);
   const [info2ContainerStyle, setInfo2ContainerStyle] = useState(false);

   useEffect(() => {
      const infoScroll = () => {
         const windowHeight = window.innerHeight;

         const infoContainer = document.querySelector(".info-container");
         const infoContainerTop = infoContainer.getBoundingClientRect().top;

         const info2Container = document.querySelector(".info2-container");
         const info2ContainerTop = info2Container.getBoundingClientRect().top;

         if (infoContainerTop < windowHeight * 0.9) {
            setInfoContainerStyle(true);
         } else {
            setInfoContainerStyle(false);
         }

         if (info2ContainerTop < windowHeight * 0.8) {
            setInfo2ContainerStyle(true);
         } else {
            setInfo2ContainerStyle(false);
         }
      };

      window.addEventListener("scroll", infoScroll);
      infoScroll();

      return () => {
         window.removeEventListener("scroll", infoScroll);
      };
   }, []);

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
               <br />
               <a
                  href="https://opensea.io/collection/boredapeyachtclub"
                  className="baycLink"
                  target="_blank"
               >
                  Collection: Bored Ape Yacht Club
               </a>
            </div>
            <Link to="./submit-nft">
               <button className="submit-btn">Submit Your NFT</button>
            </Link>
         </div>

         <br />
         <br />
         <div className="divider1"></div>
         <br />
         <br />

         <div
            className={`info-container ${infoContainerStyle ? "animate" : ""}`}
         >
            {" "}
            <div className="info-nft-image">
               <img src={degodImage} />
               <a
                  href="https://opensea.io/collection/degods"
                  className="degodLink"
                  target="_blank"
               >
                  Collection: DeGods
               </a>
            </div>
            <div className="info-text-container">
               <p className="info-text">
                  Are you a passionate artist wanting to share your art and
                  score some <span className="big-bucks-text">Big Bucks</span>?
                  Look no further! At{" "}
                  <span className="info-title-text">NFT Prize Pool</span>,
                  submit your best <span className="nft-art-text">NFT art</span>{" "}
                  pieces for a chance to win some{" "}
                  <span className="ether-tokens-text">ether</span>! We invite
                  artists from all corners of the{" "}
                  <span className="globe-text">globe</span> to share their
                  unique art and compete for a chance to win some cash!
               </p>
            </div>
         </div>

         <br />
         <br />

         <div className="divider2"></div>

         <div
            className={`info2-container ${
               info2ContainerStyle ? "animate" : ""
            }`}
         >
            <div className="left-container">
               <h1 className="header1">What Are You Waiting For</h1>
               <h2 className="header2">You Just Might Win</h2>
            </div>
            <div className="right-container">
               <Link to="./submit-nft">
                  <button className="submit-button">
                     Submit Your NFT Art Now
                  </button>
               </Link>
            </div>
         </div>

         <div className="divider3"></div>

         <footer className="footer-container">
            <a
               href="https://github.com/tSwizzz"
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

export default Home;
