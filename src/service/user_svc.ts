import Admin from "../model/admin";
import * as dao from "../repository/user_dao";

export function find(user: Admin): Admin {
  return dao.findAdmin(user);
}