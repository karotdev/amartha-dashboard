import Sidebar from './Sidebar';
import styles from './PageLayout.module.css';
import Header from './Header';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles['page-layout']}>
      <Header />
      <Sidebar />
      <div>{children}</div>
    </div>
  );
};

export default PageLayout;
