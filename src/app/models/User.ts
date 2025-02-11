
import { Role } from './role.enum';



export interface User {

  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  city: string;
  email: string;
  password: string;
  role?: Role;
}
