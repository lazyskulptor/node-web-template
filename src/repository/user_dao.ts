import {Admin, Client, User} from "../model/user";
import AdminDaoSequel from './sequel_impl/admin_sequel';
import {Role} from "../model/enums/roles";

export default function adminDaoFactory(): UserInterface<Admin> {
  // TODO: 2020-12-15 check DBType
  if (true) {
    return new AdminDaoSequel();
  }
}

export interface UserInterface<U extends User> {
  createOne: (user: U) => Promise<number>;
  updateOne: (user: U) => Promise<number>;
  create: (userList: U[]) => Promise<number>;
  updateAll: (user: U) => Promise<[number, U[]]>;
  deleteById: (userId: number) => Promise<number>,

  findByUsername: (username: string) => Promise<U>,
  findOne: (user: U) => Promise<U>;
  findByPk: (userId: number) => Promise<U>;
}

export interface AdminDao extends UserInterface<Admin>{
  updateRole: (userId: number, roles: Role[]) => Promise<boolean>;
}

export interface ClientDao extends UserInterface<Client>{
  verifyEmail: (username: string, email: string) => Promise<boolean>
}

