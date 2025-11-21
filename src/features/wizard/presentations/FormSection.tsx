import styles from './FormSection.module.css';
import type { PropsWithChildren } from 'react';

interface FormSectionProps {
  title: string;
}

const FormSection = ({
  title,
  children,
}: PropsWithChildren<FormSectionProps>) => {
  return (
    <div className={styles['form-section']}>
      <p className={styles['form-section__title']}>{title}</p>
      <div>{children}</div>
    </div>
  );
};

export default FormSection;
