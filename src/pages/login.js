import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after login
import axiosInstance from '../Axios/axiosinstance'; // Import axiosInstance
import styles from '../styles/login.module.css'; // Import CSS module

const Login = () => {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate(); // Navigation hook

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form reload
    setError(''); // Clear previous errors

    try {
      // Make a POST request to the backend login endpoint
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });

      // Save the received token to localStorage
      localStorage.setItem('lighthouse_admin_token', response.data.token);

      // Redirect to the dashboard or home page after login
      navigate('/slidersection'); // Adjust this route as per your project structure
    } catch (err) {
      // Set error message if login fails
      setError(err.response?.data?.message || 'Invalid login credentials. Please try again.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        {/* Login Form */}
        <div className={styles.loginForm}>
          <h2>Login</h2>
          {error && <p className={styles.errorMessage}>{error}</p>} {/* Display error message */}
          <form onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <label htmlFor="">Username or Email</label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state
                required
              />
            </div>
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>
        </div>

        {/* Login Image */}
        <div className={styles.loginImage}>
          <img
            src="assets/bb.png" // Ensure the image is correctly placed in 'public/assets/' folder
            alt="Login Illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
