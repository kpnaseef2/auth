
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";


function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
    setError("");
  };

 
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!formData.email.trim() || !formData.password) {
    setError("Please enter your email and password.");
    return;
  }

  try {
    const success = await login(
      formData.email,
      formData.password
    );

    if (success) {
      alert("Login successful!");
      navigate("/home");
    } else {
      setError("Invalid email or password");
    }
  } catch (error) {
    setError("Something went wrong. Try again.");
    console.log(error);
  }
};


  return (
    <main className="login-container">
      <section className="login-box" aria-labelledby="login-title">
        <h2 id="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="login-email">Email*</label>
            <input
              id="login-email"
              type="email"
              name="email"
              placeholder="Enter Email"
              autoComplete="username"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="login-password">Password*</label>
            <input
              id="login-password"
              type="password"
              name="password"
              placeholder="Enter Password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="login-button">
            Login Now
          </button>
        </form>

        <p className="login-register-text">
          Don't have an account? <a href="/">Sign Up</a>
        </p>
      </section>
    </main>
  );
}

export default Login;