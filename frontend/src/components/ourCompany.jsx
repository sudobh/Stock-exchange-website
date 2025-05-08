import React, { useEffect, useState } from "react";
import styles from "./ourCompany.module.css";
import { useNavigate } from "react-router-dom";
import { companyData } from "../assets/companyData.js";
import { Container, Nav, Button } from "react-bootstrap";
import Navbar from './Navbar.jsx';

function OurCompany() {
  const [username, setUsername] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleAuthAction = (action, company = null) => {
    const actions = {
      login: () => navigate("/login"),
      signup: () => navigate("/signup"),
      dashboard: () => navigate("/dashboard"),
      logout: () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        setUsername(null);
        navigate("/");
      },
      buy: () => navigate("/company", { state: { company } })
    };
    return actions[action]();
  };

  const filteredCompanies = companyData.filter(company =>
    company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) );

  return (
    <div className={styles.container} style={{ backgroundColor: "#212529" }}>
      <Navbar />
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Invest in Top  Companies</h1>
        <p>Discover high-growth opportunities in private markets</p>
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.searchBar}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search companies or sectors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.searchButton}>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      <div className={styles.outerContainer}>
        {filteredCompanies.map((company) => (
          <div className={styles.companyCard} key={company.id}>
            <img
              src={company.companyLogo}
              alt={company.companyName}
              className={styles.companyImage}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "placeholder-company.png";
              }}
            />
            <div className={styles.companyInfo}>
              <h6><strong>{company.companyName}</strong></h6>
              <h6>Market Cap: ₹{company.marketCapitalisation} cr</h6>
              <h6>Price: ₹{company.stockPrice}</h6>
              <h6>P/E Ratio: {company.peRatio}</h6>
            </div>
            <button
              className={`${styles.buyButton} btn`}
              onClick={() => handleAuthAction("buy", company)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      
    </div>
  );
}

export default OurCompany;