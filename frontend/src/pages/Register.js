import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BASEURL } from '../helper/helper';
import '../css/Login.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    // First Name validation
    if (!formData.firstName || formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters long';
    }
    
    // Last Name validation
    if (!formData.lastName || formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters long';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    
    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!validateForm()) {
      return;
    }

    try {
      console.log('Sending registration request to:', `${BASEURL}/api/v1/auth/register`);
      const response = await axios.post(`${BASEURL}/api/v1/auth/register`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      
      console.log('Registration response:', response.data);

      // Check if the response contains "successful" in any case
      if (response.data && response.data.toLowerCase().includes('successful')) {
        navigate('/login');
      } else {
        setErrorMessage(response.data || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.response) {
        console.error('Error response data:', error.response.data);
        
        if (error.response.data === "Email already exists") {
          setErrorMessage('Email already exists. Please use a different email.');
        } else {
          setErrorMessage(error.response.data || 'Registration failed. Please try again.');
        }
      } else if (error.request) {
        console.error('Error request:', error.request);
        setErrorMessage('Network error. Please check your connection and try again.');
      } else {
        console.error('Error message:', error.message);
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && <p className="error-message">{errors.firstName}</p>}

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            {errors.lastName && <p className="error-message">{errors.lastName}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error-message">{errors.password}</p>}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </button>
            
            <p style={{ marginTop: '10px', textAlign: 'center' }}>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register; 