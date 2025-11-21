import styles from './FormLayout.module.css';
import type { PropsWithChildren } from 'react';

const FormLayout = ({ children }: PropsWithChildren<unknown>) => {
  return <div className={styles['form-layout']}>{children}</div>;
};

const FormLayoutHeader = ({ children }: PropsWithChildren<unknown>) => {
  return <div className={styles['form-layout__header']}>{children}</div>;
};

const FormLayoutContent = ({ children }: PropsWithChildren<unknown>) => {
  return <div className={styles['form-layout__content']}>{children}</div>;
};

const FormLayoutActions = ({ children }: PropsWithChildren<unknown>) => {
  return <div className={styles['form-layout__actions']}>{children}</div>;
};

export { FormLayout, FormLayoutHeader, FormLayoutContent, FormLayoutActions };
