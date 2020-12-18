import {Admin, User} from "../model/user";
import adminDaoFactory from "../repository/user_dao";
import Pwd, {PwdType} from "./utils/pwd_encrypt";

const adminDao = adminDaoFactory();
const pwd = Pwd(PwdType.BCRYPT);

interface LoginResult {
  isSuccess: boolean,
  message?: string
}

export async function login(username: string, password: string): Promise<LoginResult> {
  const result: LoginResult = {
    isSuccess: true
  };

  const admin = await adminDao.findByUsername(username);
  if (!admin) {
    result.isSuccess = false;
    result.message = 'Incorrect username.';
  }

  if (!await pwd.isMatch(password, admin.password)) {
    result.isSuccess = false;
    result.message = 'Incorrect Password.';
  }
  return result;
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
