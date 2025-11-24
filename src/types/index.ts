import { EMPLOYMENT_TYPE_OPTIONS, ROLE_FORM_OPTIONS } from '../constants';
import type { ReactNode } from 'react';

export interface HeaderMenu {
  label: string;
  path: string;
  icon: ReactNode;
}

export interface SidebarItem {
  label: string;
  value: string;
  icon: ReactNode;
  path: string;
}

export interface RoleOption {
  label: string;
  value: 'admin' | 'ops';
  description: string;
}

export interface Step {
  id: string;
  label: string;
  dataTestId?: string;
}

export interface Option {
  label: string;
  value: number | string;
}

export interface RoleFormOption {
  label: string;
  value: (typeof ROLE_FORM_OPTIONS)[number];
}
export interface EmploymentTypeOption {
  label: string;
  value: (typeof EMPLOYMENT_TYPE_OPTIONS)[number];
}
