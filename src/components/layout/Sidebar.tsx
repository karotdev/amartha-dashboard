import { Link } from 'react-router-dom';
import { SIDEBAR_ITEMS } from '../../constants';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles['sidebar']} data-testid="sidebar">
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
  );
};

export default Sidebar;
