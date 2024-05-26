import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";

function Navibar() {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };

    const handleDashboardClick = () => {
        navigate('/dashboard');
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        setUsername(null);
        navigate('/');
    };

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/" className="me-auto">Unlisted Stock Exchange</Navbar.Brand>
                <Nav className="ms-auto">
                    {username ? (
                        <>
                            <Button variant="outline-light" className="m-1" size="sm" onClick={handleDashboardClick}>
                                {username}
                            </Button>
                            <Button variant="outline-light" className="m-1" size="sm" onClick={handleLogoutClick}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="outline-light" className="m-1" size="sm" onClick={handleLoginClick}>Log In</Button>
                            <Button variant="outline-light" className="m-1" size="sm" onClick={handleSignupClick}>Sign Up</Button>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Navibar;
