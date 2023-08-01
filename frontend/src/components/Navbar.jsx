/** @format */
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavbarTop({ connect, connected }) {
   return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
         <Container fluid>
            <Navbar.Brand href="/">NFT Prize Pool</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
               <Nav className="me-auto">
                  <Nav.Link href="/submit-nft">Submit NFT</Nav.Link>
                  <Nav.Link href="/votes">Vote</Nav.Link>
               </Nav>
               <Nav>
                  {!connected ? (
                     <Button onClick={connect}>Connect to Metamask</Button>
                  ) : (
                     <p style={{ color: "white" }}>Connected to Metamask.</p>
                  )}
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}

export default NavbarTop;
