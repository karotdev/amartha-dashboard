import { Activity, useState } from 'react';
import { ROLES_OPTIONS } from '../../constants';
import FormAdmin from './form-admin';
import FormOps from './form-ops';
import PageLayout from '../../components/layout/PageLayout';
import RoleOption from './presentations/RoleOption';
import styles from './Wizard.module.css';
import Separator from '../../components/ui/Separator';

const WizardPage = () => {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'ops' | null>(
    null,
  );

  return (
    <PageLayout>
      <div className={styles['wizard-page']}>
        <div className={styles['wizard-page__header']}>
          <p className={styles['wizard-page__title']}>Create account</p>
          <p className={styles['wizard-page__description']}>
            Choose role to get started
          </p>
        </div>
        <div className={styles['wizard-page__content']}>
          <p className={styles['wizard-page__content-title']}>Role</p>
          <div className={styles['wizard-page__options']}>
            {ROLES_OPTIONS.map((role) => (
              <RoleOption
                key={role.value}
                checked={selectedRole === role.value}
                id={role.value}
                label={role.label}
                description={role.description}
                onChange={() => setSelectedRole(role.value)}
                dataTestId={`custom-radio-${role.value}`}
              />
            ))}
          </div>
        </div>
        <Separator />
        <Activity mode={selectedRole === 'admin' ? 'visible' : 'hidden'}>
          <FormAdmin />
        </Activity>
        <Activity mode={selectedRole === 'ops' ? 'visible' : 'hidden'}>
          <FormOps />
        </Activity>
      </div>
    </PageLayout>
  );
};

export default WizardPage;
