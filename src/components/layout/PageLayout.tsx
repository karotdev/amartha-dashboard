import Header from './Header';
import Sidebar from './Sidebar';
import styles from './PageLayout.module.css';
import type { PropsWithChildren } from 'react';

const PageLayout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <div className={styles['page-layout']}>
      <Header />
      <div className={styles['page-layout__content']}>
        <Sidebar />
        <div
          className={styles['page-layout__content-main']}
          data-testid="content"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
