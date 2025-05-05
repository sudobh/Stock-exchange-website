import React from "react";
import { Link } from "react-router-dom";
import styles from './Footer.module.css';
function Footer() {
    return (
        <div className={`${styles.loginPage} container-fluid`} style={{ 
            backgroundColor: '#212529',
            marginTop: 'auto' // Ensures footer stays at bottom
        }}>
            <footer className="py-4">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3" style={{ borderColor: '#495057 !important' }}>
                    <li className="nav-item">
                        <Link to="/" className="nav-link px-3 text-light">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link px-3 text-light">Features</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link px-3 text-light">Pricing</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link px-3 text-light">FAQs</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link px-3 text-light">About</Link>
                    </li>
                </ul>
            </footer>
        </div>
    );
}

export default Footer;