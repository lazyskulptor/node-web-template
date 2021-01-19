import {Role} from "./enums/roles";

export interface User {
  userId?: number;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  department?: string;
}

export interface Admin extends User{
  roles: Role[];
}

export interface Client extends User{
  lastLogin: Date
}

