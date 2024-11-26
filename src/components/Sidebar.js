import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartLine, faBell, faChartPie, faBox, faSignOutAlt, faSun } from '@fortawesome/free-solid-svg-icons';
import styles from "../styles/Sidebar.module.css";
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${styles.sidebar} ${darkMode ? styles.dark : styles.light}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <FontAwesomeIcon icon={faHome} size="2x" />
        </div>
        <div className={styles.email}>Admin Panel</div>
      </div>



      <nav className={styles.nav}>
        <ul>
          <Link to="/SliderSection" className={styles.navItem}><FontAwesomeIcon icon={faHome} /> SliderSection</Link>
          <Link to="/TopLevelManagement" className={styles.navItem}><FontAwesomeIcon icon={faChartLine} /> TopLevelManagement</Link>
          <Link to="/Brands" className={styles.navItem}><FontAwesomeIcon icon={faBell} /> Brands</Link>
        </ul>
      </nav>

      <div className={styles.footer}>
        <button className={styles.logout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
