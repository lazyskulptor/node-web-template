import {Admin} from "../../src/model/user";
import {makeid} from "../../src/service/utils/string_utils";
import {Role} from "../../src/model/enums/roles";

export const initAdmin = (): Admin => {
  return {
    username: makeid(16),
    password: 'test_password',
    firstName: 'first',
    lastName: 'last',
    email: 'test@test.net',
    roles: [Role.SUPER_W, Role.SUPER_R],
  };
};
it('',()=>{});
