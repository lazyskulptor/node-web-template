import Admin from "../model/user";
import * as dao from "../repository/admin_dao";
import Pwd, {PwdType} from "./utils/pwd_encrypt";
const pwd = Pwd(PwdType.BCRYPT);

export async function login(username: string, password: string): Promise<boolean> {
  const admin = await dao.findUserByUsername(username);
  return pwd.isMatch(password, admin.password);
}

export async function updateAdmin(admin: Admin): Promise<[number, Admin[]]> {
  return await dao.updateAdmin(admin.userId, admin);
}

export async function deleteAdmin(admin: Admin): Promise<boolean> {
  return (await dao.deleteAdminById(admin.userId)) > 0;
}

export async function createAdmin(user: Admin): Promise<number> {
  user.password = await pwd.encrypt(user.password);
  return dao.insertAdmin(user);
}

export async function find(user: Admin): Promise<Admin> {
  return await dao.findAdmin(user);
}
