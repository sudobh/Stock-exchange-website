import React from "react";
import Navibar from "../components/Navbar";
import Foot from "../components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import Heroo from "../components/Hero";
import Company from "../components/company";
import Aboutus from "../components/AboutUS";
function Home()
{
    return (
      <div style={{ backgroundColor: "#212529" }}>
        <Navibar />
        <Heroo />
        <Company />
        <Aboutus />
        <Foot />
      </div>
    );
}

export default Home;