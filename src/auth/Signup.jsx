import React, { useState } from 'react';
import './css/style.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is imported
  
const Signup = () => {
  const apiUrl = import.meta.env.REACT_APP_API_URL; 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    alias: "",
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
      const res = await axios.post("https://pokerv1backend-production.up.railway.app/signup", formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      navigate("/login");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <section>
      {/* Span elements for visual effects */}
      {Array(120).fill().map((_, index) => (
        <span key={index}></span>
      ))}

      <div className="signin">
        <div className="content">
          <h2>Sign Up</h2>
          <form className="form" onSubmit={handleSubmit}>

            <div className="inputBox">
              <input
              type='text'
              name='alias'
              required
              onChange={handleChange}
              value={formData.alias}
              />
              <i>Username</i>
              </div>
              <div className='inputBox'>
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

export default Signup;
