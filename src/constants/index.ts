import type { RoleOption } from '../types';

export const ROLES_OPTIONS: RoleOption[] = [
  {
    label: 'Admin',
    value: 'admin',
    description: 'Admin role with full access to the system',
  },
  {
    label: 'Operations',
    value: 'operations',
    description: 'Operations role with limited access to the system',
  },
];
