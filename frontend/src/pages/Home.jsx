import React from "react";
import Navibar from "../components/Navbar";
import Foot from "../components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import Heroo from "../components/Hero";
import Company from "../components/company";
function Home()
{
    return(
    <div>
        <Navibar />
        <Heroo/>
        <Company/>
        <Foot />
    </div>);
}

export default Home;