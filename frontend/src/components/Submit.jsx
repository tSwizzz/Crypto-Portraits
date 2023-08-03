/** @format */

import React, { useState } from "react";
import "./styles/Submit.css";
import { approveNFT, submit } from "./SmartContract.jsx";

function Submit({ contract }) {
   const [submitNum, setSubmitNum] = useState(0);

   const handleApproveNFT = async () => {
      approveNFT();
   };

   const handleSubmitNFT = async () => {
      submit();
   };

   return (
      <>
         <div>
            <input
               type="number"
               id="token-id-approve"
               placeholder="Token ID"
               min="0"
            />
            <button onClick={handleApproveNFT}>Approve NFT</button>
         </div>
         <div>
            <input type="number" id="token-id" placeholder="Token ID" min="1" />
            <input
               type="number"
               id="buy-in-amount"
               placeholder="1000 wei to submit NFT"
               min="0"
            />
            <button onClick={handleSubmitNFT}>Submit NFT</button>
         </div>
      </>
   );
}

export default Submit;
