import React, { useState } from "react";
import Navibar from "../components/Navbar";
import Foot from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Image, Modal } from "react-bootstrap";
import axios from "axios";
import styles from "./CompanyPage.module.css";

function CompanyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const companyData = location.state?.company;
  const [quantity, setQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalVariant, setModalVariant] = useState("primary");

  if (!companyData) {
    if (showModal) setShowModal(false);
    navigate("/");
    return null;
  }

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (title, body, variant = "primary") => {
    setModalTitle(title);
    setModalBody(body);
    setModalVariant(variant);
    setShowModal(true);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 0 ? prev - 1 : 0));

  const handleInvest = async () => {
    if (quantity === 0) {
      handleShowModal("Input Required", "Please select at least 1 share to invest.", "warning");
      return;
    }

    if (!localStorage.getItem("token")) {
      handleShowModal("Authentication Required", "Please login to invest.", "warning");
      navigate("/login");
      return;
    }

    setIsLoading(true);
    
    try {
      const investmentData = {
        quantity,
        price: parseInt(companyData.stockPrice),
        userId: localStorage.getItem("uid"),
        companyId: companyData.id,
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
        handleShowModal(
          "Investment Successful!",
          `You have successfully invested in ${quantity} share(s) of ${companyData.companyName}.`,
          "success"
        );
        setQuantity(0);
      } else {
        handleShowModal(
          "Purchase Notice",
          response.data.message || "Your purchase is being processed.",
          "info"
        );
      }
    } catch (error) {
      console.error("Investment error:", error);
      handleShowModal(
        "Investment Failed",
        error.response?.data?.message || error.message || "An unexpected error occurred.",
        "danger"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = () => {
    const basePrice = quantity * parseFloat(companyData.stockPrice);
    const stampDuty = basePrice * 0.00015;
    const transactionFee = 20; 
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

      

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className={modalVariant ? `bg-${modalVariant} text-white` : ''}>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CompanyPage;