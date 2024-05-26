import React,{ useEffect, useState } from "react";
import Foot from "./Footer";
import styles from "./ourCompany.module.css";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
function OurCompany() {
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

   const [username, setUsername] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
     const storedUsername = localStorage.getItem("username");
     if (storedUsername) {
       setUsername(storedUsername);
     }
   }, []);

   const handleLoginClick = () => {
     navigate("/login");
   };

   const handleSignupClick = () => {
     navigate("/signup");
   };

   const handleDashboardClick = () => {
     navigate("/dashboard");
   };

   const handleLogoutClick = () => {
     localStorage.removeItem("username");
     localStorage.removeItem("token");
     setUsername(null);
     navigate("/");
   };

   const handleBuyNowClick = (company) => {
    navigate("/company", { state: { company } });
  };

  return (
    <div
      style={{
        backgroundColor: "#212529",
        minHeight: "1550px",
        color: "white",
      }}
    >
      
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home" className="me-auto" >
              Unlisted Stock Exchange
            </Navbar.Brand>
            <Nav className="ms-auto">
              {username ? (
                <>
                  <Button
                    variant="outline-light"
                    className="m-1"
                    size="sm"
                    onClick={handleDashboardClick}
                  >
                    {username}
                  </Button>
                  <Button
                    variant="outline-light"
                    className="m-1"
                    size="sm"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline-light"
                    className="m-1"
                    size="sm"
                    onClick={handleLoginClick}
                  >
                    Log In
                  </Button>
                  <Button
                    variant="outline-light"
                    className="m-1"
                    size="sm"
                    onClick={handleSignupClick}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Nav>
          </Container>
        </Navbar>
        <hr />
      <div className={`${styles.container1}`}>
        <u>
          <h1 className={`${styles.heading}`}>
            Invest in Top Unlisted Companies
          </h1>
        </u>
      </div>
      <div className={`${styles.outerrcontainer}`}>
        {CompanyData.map((data) => (
          <div className={`${styles.innercontainer}`} key={data.cname}>
            <div className={`${styles.imagecontainer}`}>
              <img
                src={data.cimg}
                alt={data.cname}
                className={`${styles.image}`}
              />
            </div>
            <div>
              <h6 className={`${styles.valuecontainer}`}>
                Name : {data.cname}
              </h6>
              <h6 className={`${styles.valuecontainer}`}>
                Market Cap(in ₹): {data.ccap}cr.
              </h6>
              <h6 className={`${styles.valuecontainer}`}>
                Current Price(in ₹): {data.cprice}
              </h6>
              <h6 className={`${styles.valuecontainer}`}>P/E: {data.cpe}</h6>
            </div>
            <div>
              <button
                type="button"
                className={`btn btn-success ${styles.buy}`}
                onClick={() => handleBuyNowClick(data)}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <Foot />
    </div>
  );
}
export default OurCompany;
