/** @format */

import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import "./styles/Navbar.css";
import "animate.css";

function NavbarTop({ connect, connected }) {
   return (
      <>
         <Navbar
            collapseOnSelect
            expand="lg"
            className="navbar-container"
            variant="dark"
         >
            <Container fluid>
               <Navbar.Brand href="/" className="navbar-brand ">
                  <span className="wave">NFT Prize Pool</span>
               </Navbar.Brand>
               <Navbar.Toggle />
               <Navbar.Collapse>
                  <Nav className="me-auto">
                     <Nav.Link href="/submit-nft" className="nav-link">
                        Submit NFT
                     </Nav.Link>
                     <Nav.Link href="/votes" className="nav-link">
                        Vote
                     </Nav.Link>
                  </Nav>
                  <Nav>
                     {!connected ? (
                        <Button onClick={connect} className="connect-button">
                           Connect to Metamask
                        </Button>
                     ) : (
                        <p className="connected-message">
                           Connected to Metamask
                        </p>
                     )}
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </>
   );
}

export default NavbarTop;
