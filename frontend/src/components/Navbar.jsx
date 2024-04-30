import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import {Container,Nav,Navbar,Button} from "react-bootstrap";

function Navibar()
{
    const navigate=useNavigate();
    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };
    return(
    
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                <Navbar.Brand href="#home" className="me-auto">Unlisted Stock Exchange</Navbar.Brand>
                
                <Nav className="ms-auto">
                    <Button variant="outline-light" className="m-1" size="sm" onClick={handleLoginClick}>Log In</Button>
                    <Button variant="outline-light" className="m-1" size="sm" onClick={handleSignupClick}>Sign Up</Button>
                </Nav>
                </Container>
            </Navbar>
            );
}

export default Navibar;