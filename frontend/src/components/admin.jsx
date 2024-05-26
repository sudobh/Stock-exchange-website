import React, { useState } from "react";
import axios from "axios";
import styles from "./admin.module.css";
import Foot from "./Footer";

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
      formData.initialSharePrice = parseFloat(formData.initialSharePrice)
      formData.marketCapitalisation = parseFloat(formData.marketCapitalisation)
      formData.peRatio = parseFloat(formData.peRatio)

      await axios.post("http://localhost:3001/newcompany", formData);
      alert("Form submitted successfully!");
      // Reset form data after submission
      setFormData({
        companyName: "",
        marketCapitalisation: "",
        initialSharePrice: "",
        peRatio: "",
        aboutCompany: "",
        companyLogo: null,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
<div className={`${styles.maincontainer}`}>
      <div className={`${styles.namecontainer}`}>Unlisted Stock Exchange</div>
      <hr className={`${styles.line}`} />
      <div className={`${styles.formcontainer}`}>
        <form onSubmit={handleSubmit}>
          <div className={`${styles.inputcontainer} row`}>
            <div className="col-6">
              <label htmlFor="CompanyName">Company Name: </label>
            </div>
            <div className="col-6">
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                placeholder="Enter Company Name"
                className={`${styles.inputfield}`}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={`${styles.inputcontainer} row`}>
            <div className="col-6">
              <label htmlFor="MarketCapitalisation">
                Market Capitalisation(in cr.₹)
              </label>
            </div>
            <div className="col-6">
              <input
                type="text"
                name="marketCapitalisation"
                value={formData.marketCapitalisation}
                placeholder="Market Capitalisation"
                className={`${styles.inputfield}`}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={`${styles.inputcontainer} row`}>
            <div className="col-6">
              <label htmlFor="initial price">
                Initial Share Price(in ₹):
              </label>
            </div>
            <div className="col-6">
              <input
                type="text"
                name="initialSharePrice"
                value={formData.initialSharePrice}
                placeholder="Initial Share Price(in ₹):"
                className={`${styles.inputfield}`}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={`${styles.inputcontainer} row`}>
            <div className="col-6">
              <label htmlFor="pe.ratio">P/E Ratio:</label>
            </div>
            <div className="col-6">
              <input
                type="text"
                name="peRatio"
                value={formData.peRatio}
                placeholder="Enter P/E Ratio"
                className={`${styles.inputfield}`}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={`${styles.inputcontainer} row`}>
            <div className="col-6">
              <label htmlFor="CompanyLogo">Company Logo: </label>
            </div>
            <div className="col-6">
              <input
                type="file"
                name="companyLogo"
                className={`${styles.inputfield1}`}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="AboutCompany" className="form-label">
              About Company:
            </label>
            <textarea
              className="form-control"
              id="AboutCompany"
              name="aboutCompany"
              value={formData.aboutCompany}
              rows="3"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className={`${styles.inputcontainer} row`}>
            <div className="col-4">
              <button type="submit" className={`${styles.submitbtn}`}>
                SUBMIT
              </button>
            </div>
          </div>
        </form>
      </div>
      <hr className={`${styles.line}`} />
      <Foot />
    </div>
  );
}

export default Adminpage;
