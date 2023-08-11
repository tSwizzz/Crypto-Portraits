/** @format */

import React from "react";
import "./styles/Submit.css";
import { submit } from "./SmartContract.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Submit() {
   const [submitSuccessMsg, setSubmitSuccessMsg] = useState("");
   const [submitted, setSubmitted] = useState(false);
   const [submitCount, setSubmitCount] = useState(0);

   const newSubmitCount = 0; //fix later
   localStorage.setItem("submitCount", newSubmitCount);

   useEffect(() => {
      const storedSubmitCount = localStorage.getItem("submitCount");
      if (storedSubmitCount) {
         setSubmitCount(parseInt(storedSubmitCount));
      }
   }, []);

   const handleSubmitNFT = async () => {
      try {
         await submit();
         setSubmitted(true);
         setSubmitCount((prevCount) => prevCount + 1);
         setSubmitSuccessMsg("Thank you for submitting your NFT! Stay tuned!");
      } catch (error) {
         alert(error);
      }
   };

   return (
      <div className="submit-container">
         {submitCount === 3 ? (
            <>
               <div className="voting-started-msg">Voting has started</div>
               <Link to="/votes">
                  <button className="vote-pg-btn">
                     Check out the voting page!
                  </button>
               </Link>
            </>
         ) : (
            <>
               <div className="header">
                  <h1>
                     It's as easy as{" "}
                     <span
                        style={{
                           fontSize: "60px",
                           color: "orange",
                        }}
                     >
                        one
                     </span>
                     {", "}
                     <span
                        style={{
                           fontSize: "75px",
                           color: "hotpink",
                        }}
                     >
                        two
                     </span>
                     ... oh wait. Just one! All I need is your{" "}
                     <span style={{ color: "cyan" }}>NFT Token ID</span> and
                     exactly <span style={{ color: "cyan" }}>1000 wei</span>!
                  </h1>
               </div>

               <div className="submit-box">
                  <h2>Enter NFT Details</h2>
                  <input
                     type="number"
                     id="token-id"
                     placeholder="Token ID"
                     min="1"
                  />
                  <input
                     type="number"
                     id="buy-in-amount"
                     placeholder="1000 wei contribution to prize pool"
                     min="0"
                  />
                  <button className="handle-btn" onClick={handleSubmitNFT}>
                     Submit NFT
                  </button>
               </div>

               {submitted && (
                  <div
                     className="submit-success-msg"
                     style={{ color: "white", fontSize: "large" }}
                  >
                     {submitSuccessMsg}
                  </div>
               )}
            </>
         )}
      </div>
   );
}

export default Submit;
