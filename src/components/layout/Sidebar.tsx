import { ArrowLeftIcon, LogOutIcon, MenuIcon, UserIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Link } from 'react-router-dom';
import { SIDEBAR_ITEMS } from '../../constants';
import { useState } from 'react';
import Logo from './Logo';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className={styles['sidebar']} data-testid="sidebar">
      <div
        className={cn(
          styles['sidebar__content'],
          showMobileMenu ? styles['sidebar__content--open'] : '',
        )}
      >
        <button
          type="button"
          className={styles['sidebar__menu-button']}
          onClick={() => setShowMobileMenu((prev) => !prev)}
        >
          <MenuIcon />
        </button>
        <div className={styles['sidebar__header']}>
          <div>
            <button
              type="button"
              className={styles['sidebar__back-button']}
              onClick={() => setShowMobileMenu((prev) => !prev)}
            >
              <ArrowLeftIcon />
              <Logo />
            </button>
          </div>
          <nav className={styles['sidebar__nav']}>
            <ul>
              {SIDEBAR_ITEMS.map((item) => (
                <li key={item.value}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles['sidebar__footer']}>
          <div className={styles['sidebar__profile']}>
            <span className={styles['sidebar__profile-avatar']}>FF</span>
            <span className={styles['sidebar__profile-name']}>Hi, Fajar!</span>
          </div>
          <div className={styles['sidebar__actions']}>
            <Link to="/profile">
              <UserIcon size={20} data-testid="sidebar-profile-icon" />
            </Link>
            <Link to="/logout">
              <LogOutIcon size={20} data-testid="sidebar-logout-icon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
