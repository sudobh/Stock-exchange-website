import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Nav,Navbar,Button} from "react-bootstrap";

function Navibar()
{
    return(
    
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                <Navbar.Brand href="#home" className="me-auto">Unlisted Stock Exchange</Navbar.Brand>
                
                <Nav className="ms-auto">
                    <Button variant="outline-light" className="m-1" size="sm">Log In</Button>
                    <Button variant="outline-light" className="m-1" size="sm">Sign Up</Button>
                </Nav>
                </Container>
            </Navbar>
            );
}

export default Navibar;