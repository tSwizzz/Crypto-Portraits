/** @format */
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Submit from "./components/Submit.jsx";
import Votes from "./components/Votes.jsx";
import Home from "./components/Home.jsx";
import { useState, useEffect } from "react";
import { connect, getAccess } from "./components/SmartContract.jsx";

function App() {
   const [contract, setContract] = useState(null);
   const [connected, setConnected] = useState(false);

   useEffect(() => {
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
         if (accounts.length > 0) {
            handleInit();
         } else setConnected(false);
      });
   }, []);

   const handleInit = () => {
      setConnected(true);
      getAccess().then(({ contract }) => {
         setContract(contract);
      });
   };

   const connectCallback = async () => {
      const { contract } = await connect();
      setContract(contract);
      if (contract) {
         setConnected(true);
      }
   };

   return (
      <Router>
         <Navbar connect={connectCallback} connected={connected} />

         <div className="container">
            <Routes>
               <Route path="/" element={<Home />} />
               <Route
                  path="submit-nft"
                  element={<Submit contract={contract} connected={connected} />}
               />
               <Route path="votes" element={<Votes contract={contract} />} />
            </Routes>
         </div>
      </Router>
   );
}

export default App;
