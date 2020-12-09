import dotenv from "dotenv";
import Admin from "../../src/model/user";
import {Role} from "../../src/model/enums/roles";
import * as svc from "../../src/service/user_svc";
import * as dao from "../../src/repository/user_dao";
import {makeid} from "../../src/service/utils/string_utils";

dotenv.config();

test('find user for login', async () => {
  const user = initAdmin();
  const pwd = user.password;
  
  const userId = await svc.createAdmin(user);
  const isPwdMatch = await svc.login(user.username, pwd);
  
  expect(isPwdMatch).toBe(true);
  dao.deleteAdminById(userId);
});

test('test find admin', async () => {
  const admin = initAdmin();
  await dao.insertAdmin(admin);
  
  const result = await svc.find(admin);
  
  expectAdmin(result, admin);
});

test('test createAdmin admin', async () => {
  const admin = initAdmin();
  
  const userId = await svc.createAdmin(admin);
  
  const result = await dao.findAdminById(userId);
  expectAdmin(admin, result);
});

test('test delete admin', async () => {
  const admin = initAdmin();
  const userId = await dao.insertAdmin(admin);
  admin.userId = userId;
  
  const res = await svc.deleteAdmin(admin);
  
  const resAdmin = await dao.findAdminById(userId);
  expect(res).toBe(true);
  expect(resAdmin).not.toBe(true);
});

test('test update admin', async () => {
  const admin = initAdmin();
  admin.userId = +(await dao.insertAdmin(admin));
  const rdName = makeid(64);
  const oldName = admin.firstName;
  admin.firstName = rdName;
  
  await svc.updateAdmin(admin);
  
  const updated = await dao.findAdminById(admin.userId);
  expect(updated.firstName).toBe(rdName);
  expect(updated.firstName).not.toBe(oldName);
  dao.deleteAdminById(admin.userId);
});

const expectAdmin = (res: Admin, exp: Admin) => {
  expect(res.roles[0]).toBe(Role.SUPER_W);
  expect(res.username).toBe(exp.username);
  dao.deleteAdminById(res.userId);
};

const initAdmin = (): Admin => {
  return {
    username: makeid(16),
    password: 'test_password',
    firstName: 'first',
    lastName: 'last',
    email: 'test@test.net',
    roles: [Role.SUPER_W, Role.SUPER_R],
  };
};

