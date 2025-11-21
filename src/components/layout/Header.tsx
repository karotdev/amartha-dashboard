import { Activity, useState } from 'react';
import { HEADER_MENU_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles['header']} data-testid="header">
      <Link to="/">
        <Logo />
      </Link>
      <div className={styles['header-action']}>
        <button
          type="button"
          className={styles['header-action__button']}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className={styles['header-action__avatar']}>FF</span>
          <span className={styles['header-action__name']}>Hi, Fajar!</span>
        </button>
        <Activity mode={isMenuOpen ? 'visible' : 'hidden'}>
          <div className={styles['header-action__menu']}>
            <ul>
              {HEADER_MENU_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Activity>
      </div>
    </div>
  );
};

export default Header;
