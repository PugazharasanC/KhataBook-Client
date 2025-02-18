// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { fetchUserData } from "./slices/userSlice";

function App() {
  const dispatch = useDispatch();

  // Fetch user data when the app loads
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
