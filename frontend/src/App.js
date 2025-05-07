import Home from "./pages/Home";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import Company from "./components/CompanyPage";
import Dashboard from "./pages/dashboard";
import OurCompany from "./components/ourCompany";
import Adminpage from "./components/admin";
import StockStream from "./components/StockStream";
import StockPrediction from "./components/StockPrediction";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/company" element={<Company />} />
        <Route path="/ShowMoreButton" element={<OurCompany />} />
        <Route path="/admin" element={<Adminpage/>}/>
        <Route path="/stock-stream" element={<StockStream/>} />
        <Route path="/stock-prediction" element={<StockPrediction/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;