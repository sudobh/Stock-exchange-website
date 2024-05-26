import React from "react";
import { Link } from "react-router-dom";
import Foot from "./Footer";
import styles from "./ourCompany.module.css"
import { CiSearch } from "react-icons/ci";
function OurCompany(){
 const CompanyData = [
   {
     cname: "Bira",
     cimg: "biralogo.png",
     ccap: "1454",
     cprice: "160",
     cpe: "-3.5",
   },
   {
     cname: "GKN Driveline",
     cimg: "gknlogo.png",
     ccap: "1754",
     cprice: "1600",
     cpe: "23.5",
   },
   {
     cname: "Mohan Meakin",
     cimg: "mohanlogo.jpg",
     ccap: "1754",
     cprice: "1490",
     cpe: "33.5",
   },
   {
     cname: "Tata Capital",
     cimg: "tatacaplogo.png",
     ccap: "398,288",
     cprice: "1490",
     cpe: "133.5",
   },
   {
     cname: "NSE",
     cimg: "nselogo.jpg",
     ccap: "236,610",
     cprice: "5000",
     cpe: "32.5",
   },
   {
     cname: "CSK",
     cimg: "img3.png",
     ccap: "5770",
     cprice: "200/-",
     cpe: "132.5",
   },
   {
     cname: "BOAT",
     cimg: "img2.png",
     ccap: "23,667",
     cprice: "500/-",
     cpe: "32.5",
   },
   {
     cname: "STUDDS",
     cimg: "img4.png",
     ccap: "10,000",
     cprice: "2500/-",
     cpe: "232.5",
   },
 ];

  
  return (
    <div
      style={{
        backgroundColor: "#212529",
        minHeight: "1550px",
        color: "white",
      }}
    >
      <div className={`${styles.outercontainer}`}>
        <div className={`${styles.companynamecontainer}`}>
          Unlisted Stock Exchange
        </div>
        <div className={`${styles.search_bar}`}>
          <div className={`${styles.search_icon}`}>
            <CiSearch />
          </div>
          <input
            placeholder="Search an company"
            className={`${styles.search_input}`}
          />
        </div>
        <div className={`${styles.btncontainer}`}>
          <Link to="/login">
            <button type="button" className="m-1 btn btn-outline-light btn-sm">
              Log In
            </button>
          </Link>

          <Link to="/signup">
            <button type="button" className="m-1 btn btn-outline-light btn-sm">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
      <div className={`${styles.container1}`}>
        <u>
          <h1 className={`${styles.heading}`}>
            Invest in Top Unlisted Companies
          </h1>
        </u>
      </div>
      <div className={`${styles.outerrcontainer}`}>
        {CompanyData.map((data) => (
          <div className={`${styles.companyContainer} container text-center`} key={data.cname}>
            <div className="row">
              <div className={` ${styles.logoContainer} col-sm`}>
                <img src={data.cimg} alt="" className={`${styles.logo}`} />
              </div>
              <div className="col-sm">{data.cname}</div>
              <div className="col-sm">&#8377;{data.ccap}</div>
              <div className="col-sm">&#8377;{data.cprice}</div>
              <div className="col-sm">{data.cpe}</div>
              <div className={`${styles.action} col-sm`}>
              <Link to={`/company/${encodeURIComponent(data.cname)}/${data.ccap}/${data.cprice}/${data.cpe}/${encodeURIComponent(data.cimg)}`} className="btn btn-success">
                  Buy
                </Link>
                <button type="button" className="btn btn-warning">
                  Warning
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Foot />
    </div>
  );
}
export default OurCompany;