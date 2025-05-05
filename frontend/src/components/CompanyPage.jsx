import React, { useState } from "react";
import Navibar from "../components/Navbar";
import Foot from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import axios from "axios";
import styles from "./CompanyPage.module.css";

function CompanyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const companyData = location.state?.company;
  const [quantity, setQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  if (!companyData) {
    navigate("/");
    return null;
  }

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 0 ? prev - 1 : 0));

  const handleInvest = async () => {
    if (quantity === 0) {
      alert("Please select at least 1 share");
      return;
    }

    if (!localStorage.getItem("token")) {
      alert("Please login to invest");
      navigate("/login");
      return;
    }

    setIsLoading(true);
    
    try {
      const investmentData = {
        quantity,
        price: parseInt(companyData.stockPrice),
        userId: localStorage.getItem("uid"),
        companyId: "clwnljmzd0001kod8mp9zmvnw",
      };

      const response = await axios.post(
        "http://localhost:3001/api/buystocks",
        investmentData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Investment successful!");
        setQuantity(0);
      }
    } catch (error) {
      console.error("Investment error:", error);
      alert(`Investment failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = () => {
    const basePrice = quantity * companyData.stockPrice;
    const stampDuty = basePrice * 0.00015;
    const transactionFee = 20; // Example fixed fee
    return {
      basePrice,
      stampDuty,
      transactionFee,
      total: basePrice + stampDuty + transactionFee
    };
  };

  const totals = calculateTotal();

  return (
    <div className={styles.container}>
      <Navibar />
      
      <div className={styles.companyContainer}>
        <div className={styles.companyHeader}>
          <Image
            src={companyData.companyLogo}
            className={styles.companyImage}
            alt={companyData.companyName}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder-company.png";
            }}
          />
          <div>
            <h1 className={styles.companyName}>{companyData.companyName}</h1>
            <p className={styles.companyDescription}>
              {companyData.about || "This company is a leading player in its sector with strong growth potential and a proven track record of performance."}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.investmentContainer}>
        <h2>Investment Details</h2>
        
        <div className={styles.detailRow}>
          <span>Market Cap:</span>
          <span>₹{companyData.marketCapitalisation} cr</span>
        </div>
        <div className={styles.detailRow}>
          <span>Current Price:</span>
          <span>₹{companyData.stockPrice}</span>
        </div>
        <div className={styles.detailRow}>
          <span>P/E Ratio:</span>
          <span>{companyData.peRatio}</span>
        </div>

        <div className={styles.quantityControls}>
          <button 
            className={styles.controlButton}
            onClick={decrementQuantity}
            disabled={quantity === 0}
          >
            -
          </button>
          <span className={styles.quantityDisplay}>{quantity}</span>
          <button 
            className={styles.controlButton}
            onClick={incrementQuantity}
          >
            +
          </button>
          <span style={{ marginLeft: '1rem' }}>Shares</span>
        </div>

        <div className={styles.detailRow}>
          <span>Subtotal:</span>
          <span>₹{totals.basePrice.toFixed(2)}</span>
        </div>
        <div className={styles.detailRow}>
          <span>Stamp Duty (0.015%):</span>
          <span>₹{totals.stampDuty.toFixed(2)}</span>
        </div>
        <div className={styles.detailRow}>
          <span>Transaction Fee:</span>
          <span>₹{totals.transactionFee.toFixed(2)}</span>
        </div>

        <div className={styles.totalPrice}>
          <span>Total Investment:</span>
          <span>₹{totals.total.toFixed(2)}</span>
        </div>

        <Button
          className={styles.investButton}
          onClick={handleInvest}
          disabled={isLoading || quantity === 0}
        >
          {isLoading ? "Processing..." : "Invest Now"}
        </Button>
      </div>

      <Foot />
    </div>
  );
}

export default CompanyPage;