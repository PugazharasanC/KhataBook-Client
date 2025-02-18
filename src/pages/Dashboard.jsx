// src/pages/Dashboard.jsx
import { useSelector } from "react-redux";

function Dashboard() {
  const { user, loading, error } = useSelector((state) => state.user);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!user) {
    // Redirect to home page if no user is found
    window.location.href = "/";
    return null;
  }

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <h2>User Info:</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Add more user data as needed */}
    </div>
  );
}

export default Dashboard;
