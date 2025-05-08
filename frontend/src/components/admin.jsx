import React, { useState } from "react";
import axios from "axios";
import styles from "./admin.module.css"; 

function Adminpage() {
  const [formData, setFormData] = useState({
    companyName: "",
    marketCapitalisation: "",
    initialSharePrice: "",
    peRatio: "",
    aboutCompany: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Basic validation
      if (!formData.companyName.trim() || !formData.aboutCompany.trim()) {
        alert("Company Name and About Company are required.");
        return; // Stop submission
      }

      const payload = {
        companyName: formData.companyName,
        marketCapitalisation: parseFloat(formData.marketCapitalisation),
        initialSharePrice: parseFloat(formData.initialSharePrice),
        peRatio: parseFloat(formData.peRatio),
        aboutCompany: formData.aboutCompany,
      };

      await axios.post("http://localhost:3001/newcompany", payload);
      alert("Form submitted successfully!");
      // Reset form data after submission
      setFormData({
        companyName: "",
        marketCapitalisation: "",
        initialSharePrice: "",
        peRatio: "",
        aboutCompany: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1>
            Stock Exchange
          </h1>
          <p>
            Add a new company to the exchange
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <div className={styles.formGroup}>
            <label
              htmlFor="CompanyName"
              className={styles.label}
            >
              Company Name:
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              placeholder="Enter Company Name"
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label
              htmlFor="MarketCapitalisation"
              className={styles.label}
            >
              Market Capitalisation (in ₹ Cr):
            </label>
            <input
              type="number"
              name="marketCapitalisation"
              value={formData.marketCapitalisation}
              placeholder="Market Capitalisation"
              onChange={handleChange}
              required
              min={1000}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label
              htmlFor="initialSharePrice"
              className={styles.label}
            >
              Initial Share Price (in ₹):
            </label>
            <input
              type="number"
              name="initialSharePrice"
              value={formData.initialSharePrice}
              placeholder="Initial Share Price"
              onChange={handleChange}
              required
              min={1}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label
              htmlFor="peRatio"
              className={styles.label}
            >
              P/E Ratio:
            </label>
            <input
              type="number"
              name="peRatio"
              value={formData.peRatio}
              placeholder="Enter P/E Ratio"
              onChange={handleChange}
              required
              min={0}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label
              htmlFor="AboutCompany"
              className={styles.label}
            >
              About Company:
            </label>
            <textarea
              id="AboutCompany"
              name="aboutCompany"
              value={formData.aboutCompany}
              rows={4}
              onChange={handleChange}
              required
              placeholder="Enter company description..."
              className={styles.textarea}
            />
          </div>
          <button
            type="submit"
            className={styles.button}
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}

export default Adminpage;
