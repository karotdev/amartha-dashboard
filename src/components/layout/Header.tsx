import { Activity, useState, useRef, useEffect } from 'react';
import { HEADER_MENU_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className={styles['header']} data-testid="header">
      <Link to="/">
        <Logo />
      </Link>
      <div className={styles['header-action']}>
        <button
          ref={buttonRef}
          type="button"
          className={styles['header-action__button']}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className={styles['header-action__avatar']}>FF</span>
          <span className={styles['header-action__name']}>Hi, Fajar!</span>
        </button>
        <Activity mode={isMenuOpen ? 'visible' : 'hidden'}>
          <div ref={menuRef} className={styles['header-action__menu']}>
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
