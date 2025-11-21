import { ArrowLeftIcon, MenuIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { HEADER_MENU_ITEMS, SIDEBAR_ITEMS } from '../../constants';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Logo from './Logo';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

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
                  <Link
                    to={item.path}
                    className={
                      isActive(item.path)
                        ? styles['sidebar__nav-item--active']
                        : ''
                    }
                  >
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
            {HEADER_MENU_ITEMS.map((item) => (
              <Link key={item.label} to={item.path}>
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
