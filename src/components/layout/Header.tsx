import { Activity, useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles['header']}>
      <a href="/">
        <h1 className={styles['header__title']}>
          Amartha<span>.</span>
        </h1>
      </a>
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
              <li>
                <a href="/">
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </Activity>
      </div>
    </div>
  );
};

export default Header;
