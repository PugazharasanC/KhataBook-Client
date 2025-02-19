import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin"; // Ensure you have the GoogleLogin component correctly set up

function Home() {
  const user = useSelector((state) => state.user.user); // Get user details from Redux store
  const navigate = useNavigate();
  console.log(user)
  if (user) {
    // If user is logged in, show their details and a button to go to the dashboard
    return (
      <div>
        <h1>Welcome, {user.name}</h1>
        <img src={user.profilePicture} alt="Profile" />
        <p>Email: {user.email}</p>
        <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
      </div>
    );
  }

  // If the user isn't logged in, show the Google Login component
  return (
    <div>
      <h1>Khatabook</h1>
      <GoogleLogin /> {/* Prompt the user to login */}
    </div>
  );
}

export default Home;
