import {
  ArrowLeftRightIcon,
  ChartNoAxesGanttIcon,
  SettingsIcon,
  UsersIcon,
} from 'lucide-react';
import type { RoleOption, SidebarItem, Step } from '../types';

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: 'Overview',
    value: 'overview',
    icon: <ChartNoAxesGanttIcon />,
    path: '/overview',
  },
  {
    label: 'Transactions',
    value: 'transactions',
    icon: <ArrowLeftRightIcon />,
    path: '/transactions',
  },
  {
    label: 'Employees',
    value: 'employees',
    icon: <UsersIcon />,
    path: '/employees',
  },
  {
    label: 'Settings',
    value: 'settings',
    icon: <SettingsIcon />,
    path: '/settings',
  },
];

export const ROLES_OPTIONS: RoleOption[] = [
  {
    label: 'Admin',
    value: 'admin',
    description: 'Admin role with full access to the system',
  },
  {
    label: 'Operations',
    value: 'ops',
    description: 'Operations role with limited access to the system',
  },
];

export const WIZARD_STEPS_ADMIN: Step[] = [
  {
    id: 'basic-information',
    label: 'Basic Information',
    dataTestId: 'step-basic-information',
  },
  { id: 'details', label: 'Details', dataTestId: 'step-details' },
];

export const WIZARD_STEPS_OPS: Step[] = [
  {
    id: 'details',
    label: 'Details',
    dataTestId: 'step-details',
  },
];
