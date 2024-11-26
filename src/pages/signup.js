// Signup.js
import React from 'react';
import styles from '../styles/signup.module.css'; // Importing CSS module
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupBox}>
        <div className={styles.signupForm}>
          <h2>Welcome Here</h2>
          <p>Create an account</p>
          <form>
            <div className={styles.inputGroup}>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Username" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email address</label>
              <input type="email" id="email" placeholder="Email address" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Password" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="repeat-password">Repeat password</label>
              <input type="password" id="repeat-password" placeholder="Repeat password" />
            </div>
            <button type="submit" className={styles.signupButton}>
              Sign up
            </button>
          </form>
          <p className={styles.signinLink}>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
        <div className={styles.signupImage}>
          <img
            src="assets/piano2.jpg"
            alt="Signup Background"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
