import styles from "./admin.module.css"
import Foot from "./Footer";
function Adminpage() {
  return (
    <div className={`${styles.maincontainer}`}>
      <div className={`${styles.namecontainer}`}>Unlisted Stock Exchange</div>
      <hr className={`${styles.line}`} />
      <div className={`${styles.formcontainer}`}>
        <form action="">
          <div className={`${styles.inputcontainer} row`}>
            <div className="col-6">
              <label htmlFor="CompanyName">Company Name: </label>
            </div>
            <div className="col-6">
              <input
                type="text"
                placeholder="Enter Company Name"
                className={`${styles.inputfield}`}
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
                placeholder="Market Capitalisation"
                className={`${styles.inputfield}`}
              />
            </div>
          </div>
          <div className={`${styles.inputcontainer} row`}>
            <div className="col-6">
              <label htmlFor="initial price">Initial Share Price(in ₹): </label>
            </div>
            <div className="col-6">
              <input
                type="text"
                placeholder="Initial Share Price(in ₹):"
                className={`${styles.inputfield}`}
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
                placeholder="Enter P/E Ratio"
                className={`${styles.inputfield}`}
              />
            </div>
          </div>

          <div className={`${styles.inputcontainer} row`}>
            <div className="col-6">
              <label htmlFor="CompanyLogo">Company Logo: </label>
            </div>
            <div className="col-6">
              <input type="file" className={`${styles.inputfield1}`} />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="AboutCompany" className="form-label">
              About Company:
            </label>
            <textarea
              className="form-control"
              id="AboutCompany"
              rows="3"
            ></textarea>
          </div>
          <div className={`${styles.inputcontainer} row`}>
            <div className="col-4">
              <button className={`${styles.submitbtn}`}>
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
