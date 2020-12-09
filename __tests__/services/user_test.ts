import Admin, {AdminI} from "../../src/model/admin";
import {Role} from "../../src/model/enums/roles";
import * as svc from "../../src/service/user_svc";
import * as dao from "../../src/repository/user_dao";

test('find admin', async () => {
  const admin = initAdmin();
  dao.insertAdmin(admin);
  
  const result = svc.find(admin);
  
  expect(result.username).toBe(true);
  expect(result.firstName).toBe(admin.firstName);
});

const initAdmin = (): Admin => {
  return new Admin({
    username: 'test_inserted',
    password: 'test_password',
    roles: [Role.SUPER_W, Role.SUPER_R],
    firstName: 'name'
  });
}
