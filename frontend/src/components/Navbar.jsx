import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Nav, Navbar, Button, Dropdown } from "react-bootstrap";
import { PersonFill, BoxArrowRight, PersonPlus, KeyFill, GraphUp } from "react-bootstrap-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Navbar.module.css';

function CustomNavbar() {
    const [username, setUsername] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) setUsername(storedUsername);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleAuthAction = (action) => {
        const actions = {
            login: () => navigate('/login'),
            signup: () => navigate('/signup'),
            dashboard: () => navigate('/dashboard'),
            logout: () => {
                localStorage.removeItem('username');
                localStorage.removeItem('token');
                setUsername(null);
                navigate('/');
            }
        };
        return actions[action]();
    };

    return (
        <Navbar 
            bg={isScrolled ? "dark" : "transparent"} 
            variant="dark" 
            expand="lg" 
            fixed="top"
            className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
        >
            <Container>
                <Navbar.Brand as={Link} to="/" className={`${styles.brand} me-auto`}>
                    <span className={styles.brandHighlight}>STOCK</span> Exchange
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link 
                            as={Link} 
                            to="/stock-stream" 
                            className="d-flex align-items-center me-3"
                        >
                            <GraphUp className="me-1" /> Live Stocks
                        </Nav.Link>
                        
                        {username ? (
                            <Dropdown align="end">
                                <Dropdown.Toggle variant="outline-light" className={styles.userDropdown}>
                                    <PersonFill className="me-2" />
                                    {username}
                                </Dropdown.Toggle>
                                
                                <Dropdown.Menu className={styles.dropdownMenu}>
                                    <Dropdown.Item 
                                        onClick={() => handleAuthAction('dashboard')}
                                        className={styles.dropdownItem}
                                    >
                                        <PersonFill className="me-2" /> Dashboard
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item 
                                        onClick={() => handleAuthAction('logout')}
                                        className={styles.dropdownItem}
                                    >
                                        <BoxArrowRight className="me-2" /> Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <>
                                <Button 
                                    variant="outline-light" 
                                    className={`${styles.authButton} mx-2`}
                                    onClick={() => handleAuthAction('login')}
                                >
                                    <KeyFill className="me-2" /> Log In
                                </Button>
                                <Button 
                                    variant="primary" 
                                    className={styles.authButton}
                                    onClick={() => handleAuthAction('signup')}
                                >
                                    <PersonPlus className="me-2" /> Sign Up
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;