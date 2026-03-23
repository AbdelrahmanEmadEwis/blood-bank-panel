export type User = {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'superadmin' | 'company' | 'user';
  phone: string;
  image: string | null;
  bio: string | null;
  company_name: string | null;
  company_link: string | null;
  address: string | null;
  birth_date: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
