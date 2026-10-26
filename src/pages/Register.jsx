import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
function Registration() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    await register(formData);

    alert("Registration successful!");

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    navigate("/login");
  } catch (error) {
    alert("Registration failed!");
    console.log(error);
  }
};


  return (
    <div className="registration-container">
      <div className="registration-box">
        <h3>Create Your Account</h3>

        <form onSubmit={handleSubmit}>
          <div className="registration-row mb-3">
            <div className="registration-col-md-6">
              <label className="registration-form-label">First Name*</label>
              <input
                type="text"
                name="firstName"
                className="registration-form-control"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="registration-col-md-6">
              <label className="registration-form-label">Last Name*</label>
              <input
                type="text"
                name="lastName"
                className="registration-form-control"
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="registration-form-label">Email*</label>
            <input
              type="email"
              name="email"
              className="registration-form-control"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="registration-form-label">Password*</label>
            <input
              type="password"
              name="password"
              className="registration-form-control"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              minLength={8}
              required
            />
          </div>

          <div className="mb-3">
            <label className="registration-form-label">Confirm Password*</label>
            <input
              type="password"
              name="confirmPassword"
              className="registration-form-control"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength={8}
              required
            />
          </div>

          <div className="registration-text-end mt-4">
            <button type="submit" className="registration-btn registration-btn-primary">
              Signup Now
            </button>
          </div>
        </form>
      </div>

      <p className="registration-login-text">
        If you have an account, Please{" "}
        <a href="/login">Login Now</a>
      </p>
    </div>
  );
}

export default Registration;