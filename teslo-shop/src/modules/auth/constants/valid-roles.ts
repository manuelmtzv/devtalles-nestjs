export const VALID_ROLES = {
  user: 'user',
  admin: 'admin',
  superadmin: 'superadmin',
} as const;

export type ValidRoles = (typeof VALID_ROLES)[keyof typeof VALID_ROLES];
