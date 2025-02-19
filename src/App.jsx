// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Ensure Routes and Route are used correctly
// import GoogleLogin from "./pages/GoogleLogin";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        {/* Correct usage of element */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
