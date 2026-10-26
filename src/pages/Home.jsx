import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome, {user?.firstName} 👋</h1>

        <p>You have successfully logged in!</p>

        <div className="home-user-info">
          <h3>Profile Details</h3>

          <p>
            <strong>Name:</strong> {user?.firstName}
          </p>

          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>

        <h4>Enjoy your dashboard 🚀</h4>

        <button
          className="home-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
