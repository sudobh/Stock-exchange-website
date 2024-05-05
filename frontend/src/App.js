import Home from "./pages/Home";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import Company from "./components/CompanyPage";
import OurCompany from "./components/ourCompany";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/company" element={<Company />} />
        <Route path="/ShowMoreButton" element={<OurCompany />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;