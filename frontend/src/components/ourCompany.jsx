import React from "react";
import { Link } from "react-router-dom";
import Navibar from "./Navbar";
import Foot from "./Footer";
import styles from "./ourCompany.module.css"
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
 ];
  
  return (
    <>
      <Navibar />

      <div>
        <div className={`${styles.headingContainer} container text-center`}>
          <div className="row">
            <div className="col-sm">Company</div>
            <div className="col-sm">
              <input type="text" />
            </div>
            <div className="col-sm">Market Cap</div>
            <div className="col-sm">Current Price</div>
            <div className="col-sm">P/E</div>
            <div className="col-sm">Action</div>
          </div>
        </div>
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
    </>
  );
}
export default OurCompany;