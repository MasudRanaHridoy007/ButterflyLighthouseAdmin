import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartLine, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styles from "../styles/Sidebar.module.css";
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('lighthouse_admin_token');
    navigate('/login');
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <img src="/assets/bb.png" alt="Logo" className={styles.logo} />
        <div className={styles.email}>Admin Panel</div>
      </div>

      <nav className={styles.nav}>
        <ul>
          <NavLink
            to="/slidersection"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            <FontAwesomeIcon icon={faHome} /> Slider Section
          </NavLink>
          <NavLink
            to="/toplevelmanagement"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            <FontAwesomeIcon icon={faChartLine} /> Management Team
          </NavLink>
          <NavLink
            to="/brands"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            <FontAwesomeIcon icon={faBell} /> Brands
          </NavLink>
        </ul>
      </nav>

      <div className={styles.footer}>
        <button className={styles.logout} onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
