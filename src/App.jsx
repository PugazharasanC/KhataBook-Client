// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Profile from "./components/Profile.jsx";
import Home from "./components/Home.jsx";

function App() {
  const userToken = useSelector((state) => state.auth.token);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute component={<Dashboard />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute component={<Profile />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
