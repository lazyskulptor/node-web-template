import {Role} from "./enums/roles";

export interface AdminI {
  userId?: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  roles: Role[];
  department?: string;
}

export default class Admin implements AdminI{
  
  constructor(init?: AdminI) {
    this.userId = init.userId;
    this.username = init.username;
    this.password = init.password;
    this.firstName = init.firstName;
    this.lastName = init.lastName;
    this.email = init.email;
    this.phone = init.phone;
    this.roles = init.roles;
    this.department = init.department;
  }
  
  department: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  roles: Role[];
  userId: string;
  username: string;
}
