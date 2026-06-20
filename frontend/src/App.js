import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AnalyzerPage from "./pages/AnalyzerPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analyzer" element={<AnalyzerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;