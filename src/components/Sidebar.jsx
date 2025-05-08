import React from 'react';
import styles from './Sidebar.module.css';
import { BiHomeAlt, BiFolder, BiTask, BiCalendar, BiMessageSquareDetail, BiCog, BiChat } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoSection}>
        <div className={styles.logoIcon}></div>
        <span className={styles.logoText}>Planify</span>
      </div>
      <nav className={styles.menu}>
        <ul>
          <li className={location.pathname === '/' ? styles.active : ''}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <BiHomeAlt className={styles.icon}/> Home
            </Link>
          </li>
          <li><BiFolder className={styles.icon}/> Project</li>
          <li className={location.pathname === '/task-tracking' ? styles.active : ''}>
            <Link to="/task-tracking" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <BiTask className={styles.icon}/> Task Tracking
            </Link>
          </li>
          <li className={location.pathname === '/calendar' ? styles.active : ''}>
            <Link to="/calendar" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <BiCalendar className={styles.icon}/> Calender
            </Link>
          </li>
        </ul>
        <div className={styles.menuLabel}>Another Options</div>
        <ul>
          <li><BiCog className={styles.icon}/> Services</li>
          <li><BiChat className={styles.icon}/> Chat</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar; 