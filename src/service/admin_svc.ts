import {Admin, User} from "../model/user";
import adminDaoFactory from "../repository/user_dao";
import Pwd, {PwdType} from "./utils/pwd_encrypt";
const adminDao = adminDaoFactory();
const pwd = Pwd(PwdType.BCRYPT);


export async function login(user: User): Promise<boolean> {
  const admin = await adminDao.findByUsername(user.username);
  return pwd.isMatch(user.password, admin.password);
}

export async function updateAdmin(admin: Admin): Promise<number> {
  return adminDao.updateOne(admin);
}

export async function deleteUser(admin: User): Promise<boolean> {
  return (await adminDao.deleteById(admin.userId)) > 0;
}

export async function createAdmin(user: Admin): Promise<number> {
  user.password = await pwd.encrypt(user.password);
  return adminDao.createOne(user);
}

export async function find(user: Admin): Promise<Admin> {
  return adminDao.findOne(user);
}
