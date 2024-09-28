import React, { useState } from 'react';
import './css/style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import getToken from './getToken';

const Login = () => {
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("https://pokerv1backend-production.up.railway.app/login", formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Check if the response contains the access token
      if (res.data.access_token) {
        localStorage.setItem('token', res.data.access_token);
      
        navigate("/new_game");
      } else {
        console.error('Token not found in response:', res.data);
      }
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log("Error response:", error.response.data);
        console.log("Error status:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("Error request:", error.request);
      } else {
        // Something happened in setting up the request
        console.log("Error message:", error.message);
      }
    }
  };

  return (
    <section>
      {Array(120).fill().map((_, index) => (
        <span key={index}></span>
      ))}

      <div className="signin">
        <div className="content">
          <h2>Sign In</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="inputBox">
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                value={formData.email}
              />
              <i>Email</i>
            </div>
            <div className="inputBox">
              <input
                type="password"
                name="password"
                required
                onChange={handleChange}
                value={formData.password}
              />
              <i>Password</i>
            </div>
            <div className="links">
              <a href="#">Forgot Password</a>
              <a href="#">Signup</a>
            </div>
            <div className="inputBox">
              <input type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

// Logout handling
export function handleLogout() {
  
  const token = getToken();
  
  axios.post("https://pokerv1backend-production.up.railway.app/logout", {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(() => {
    localStorage.clear();
    console.log("Successfully logged out");
  })
  .catch((error) => {
    console.log("Logout error:", error);
  });
  na

  timer();
}

export function timer() {
  console.log("Logging out in 10 seconds");
  
  setTimeout(() => {
    handleLogout();
  }, 10000);
}
