import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;