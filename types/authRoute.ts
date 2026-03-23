export type Role = 'user' | 'company' | 'superadmin';
export interface RouteConfig {
  path: string;
  roles: Role[];
}
