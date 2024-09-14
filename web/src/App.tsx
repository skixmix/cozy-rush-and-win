import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";
import HomePage from "./pages/home/HomePage";
import Disclaimer from "./pages/disclaimer/Disclaimer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
