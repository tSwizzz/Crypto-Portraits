/** @format */

import React from "react";
import "./styles/Home.css";
import baycImage from "./images/bayc.jpg";
import { Link } from "react-router-dom";

function Home() {
   return (
      <div className="home-container">
         <h1 className="home-title">Welcome to NFT Prize Pool</h1>
         <p className="home-body">
            Submit your NFT art against 2 other competitors and stand a chance
            to win the prize pool cash! Besides... 10% goes to me, so hurry up
            and give me money!
         </p>
         <div className="nft-pic">
            <img src={baycImage} />
         </div>
         <Link to="./submit-nft">
            <button className="submit-btn">Submit Your NFT</button>
         </Link>
      </div>
   );
}

export default Home;
