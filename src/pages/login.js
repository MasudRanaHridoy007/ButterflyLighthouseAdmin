// Login.js
import React from 'react';
import styles from '../styles/login.module.css'; // Import CSS module
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        {/* Login Form */}
        <div className={styles.loginForm}>
          <h2>Login</h2>
          <form>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Username or Email</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>
          <p className={styles.signupLink}>
            Don't have an account yet? <Link to="/Signup">Sign up</Link>
          </p>
        </div>

        {/* Login Image */}
        <div className={styles.loginImage}>
          <img
            src="assets/bb.png" // Ensure 'piano.jpg' is located in the 'public/assets/' folder
            alt="Login Illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
