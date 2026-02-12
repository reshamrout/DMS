export type UserRole = 'none' | 'admin' | 'editor' | 'viewer';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}
