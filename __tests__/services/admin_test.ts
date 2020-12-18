import dotenv from "dotenv";
import {Admin} from "../../src/model/user";
import {Role} from "../../src/model/enums/roles";
import * as svc from "../../src/service/admin_svc";
import usrdao from "../../src/repository/user_dao";
import {makeid} from "../../src/service/utils/string_utils";
import initDao from "../../src/repository/setting_db_dao";

dotenv.config();

describe('admin service test', () => {
  beforeEach(() => {
    initDao().truncateTb('admin');
  });
  test('find user for login', async () => {
    const user = initAdmin();
    const pwd = user.password;
  
    const userId = await svc.createAdmin(user);
    user.password = pwd;
    const isPwdMatch = await svc.login(user.username, user.password);
  
    expect(isPwdMatch.isSuccess).toBe(true);
    usrdao().deleteById(userId);
  });
  
  test('test find admin', async () => {
    const admin = initAdmin();
    await usrdao().createOne(admin);
  
    const result = await svc.find(admin);
  
    await expectAdmin(result, admin);
  });
  
  test('test createAdmin admin', async () => {
    const admin = initAdmin();
  
    const userId = await svc.createAdmin(admin);
    admin.userId = userId;
  
    const result = await usrdao().findByPk(userId);
    await expectAdmin(admin, result);
  });
  
  test('test delete admin', async (done) => {
    const admin = initAdmin();
    const userId = await usrdao().createOne(admin);
    admin.userId = userId;
  
    const res = await svc.deleteUser(admin);
  
    const resAdmin = await usrdao().findByPk(userId);
    expect(res).toBe(true);
    expect(resAdmin).not.toBe(true);
    done();
  });
  
  test('test update admin', async () => {
    const admin = initAdmin();
    admin.userId = +(await usrdao().createOne(admin));
    const rdName = makeid(64);
    const oldName = admin.firstName;
    admin.firstName = rdName;
  
    await svc.updateAdmin(admin);
  
    const updated = await usrdao().findByPk(admin.userId);
    expect(updated.firstName).toBe(rdName);
    expect(updated.firstName).not.toBe(oldName);
    usrdao().deleteById(admin.userId);
  });
});


const expectAdmin = async (res: Admin, exp: Admin) => {
  expect(res.roles[0]).toBe(Role.SUPER_W);
  expect(res.username).toBe(exp.username);
  await usrdao().deleteById(res.userId);
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
