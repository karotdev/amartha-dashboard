import PageLayout from '../../components/layout/PageLayout';
import RoleOption from './presentations/RoleOption';
import { ROLES_OPTIONS } from '../../constants';
import { useState } from 'react';

const WizardPage = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  return (
    <PageLayout>
      <div>WizardPage</div>
      <div style={{ display: 'flex', gap: '16px' }}>
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
    </PageLayout>
  );
};

export default WizardPage;
