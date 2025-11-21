import { Activity } from 'react';
import { ROLES_OPTIONS } from '../../constants';
import { useSearchParams } from 'react-router-dom';
import FormAdmin from './form-admin';
import FormOps from './form-ops';
import FormSection from './presentations/FormSection';
import PageLayout from '../../components/layout/PageLayout';
import RoleOption from './presentations/RoleOption';
import styles from './Wizard.module.css';
import FormTitle from './presentations/FormTitle';
import Separator from '../../components/ui/Separator';

const WizardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedRole = searchParams.get('role') as 'admin' | 'ops' | null;

  const handleRoleChange = (role: 'admin' | 'ops') => {
    setSearchParams({ role });
  };

  return (
    <PageLayout>
      <div className={styles['wizard-page']}>
        <FormTitle
          title="Account Wizard"
          description="Choose role to get started"
        />
        <FormSection title="Role">
          <div className={styles['wizard-page__options']}>
            {ROLES_OPTIONS.map((role) => (
              <RoleOption
                key={role.value}
                checked={selectedRole === role.value}
                id={role.value}
                label={role.label}
                description={role.description}
                onChange={() => handleRoleChange(role.value)}
                dataTestId={`custom-radio-${role.value}`}
              />
            ))}
          </div>
        </FormSection>
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
