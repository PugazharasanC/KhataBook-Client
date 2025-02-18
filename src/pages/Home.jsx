// src/pages/Home.jsx
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Trigger the backend login (Google OAuth)
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  if (user) {
    return (
      <div>
        <h1>Welcome, {user.name}</h1>
        <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Khatabook</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}

export default Home;
