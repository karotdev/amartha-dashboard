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

const FormLayoutSection = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  return (
    <div className={styles['form-layout__section']}>
      <p className={styles['form-layout__section-title']}>{title}</p>
      <div>{children}</div>
    </div>
  );
};

const FormLayoutTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <p className={styles['form-layout__title']}>{title}</p>
      <p>{description}</p>
    </div>
  );
};

export {
  FormLayout,
  FormLayoutHeader,
  FormLayoutContent,
  FormLayoutActions,
  FormLayoutSection,
  FormLayoutTitle,
};
