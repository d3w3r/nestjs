import { User } from './users.entity';

export interface Customer {
  id: number;
  fullname: string;
  phone?: string;
  email?: string;
  user: User;
}
