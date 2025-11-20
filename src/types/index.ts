import type { ReactNode } from 'react';

export interface SidebarItem {
  label: string;
  value: string;
  icon: ReactNode;
  path: string;
}

export interface RoleOption {
  label: string;
  value: string;
  description: string;
}
