import styles from './FormTitle.module.css';

interface FormTitleProps {
  title: string;
  description?: string;
}

const FormTitle = ({ title, description }: FormTitleProps) => {
  return (
    <div>
      <p className={styles['form-title__title']}>{title}</p>
      <p>{description}</p>
    </div>
  );
};

export default FormTitle;
