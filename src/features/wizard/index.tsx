import PageLayout from '../../components/layout/page-layout';
import RoleOption from './presentations/role-option';
import { ROLES_OPTIONS } from '../../constants';

const WizardPage = () => {
  return (
    <PageLayout>
      <div>WizardPage</div>
      {ROLES_OPTIONS.map((role) => (
        <RoleOption
          key={role.value}
          checked={false}
          label={role.label}
          description={role.description}
          dataTestId={`custom-radio-${role.value}`}
        />
      ))}
    </PageLayout>
  );
};

export default WizardPage;
