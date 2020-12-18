import {Admin} from "../../model/user";
import {AdminDao} from "../user_dao";
import AdminImpl from "../adapter/admin_adapter";
import {Role} from "../../model/enums/roles";

export {AdminImpl};

export default class AdminDaoSequel implements AdminDao {
  findOne = async (user: Admin): Promise<Admin> => {
    return AdminImpl.findOne();
  };

  findByPk = async (userId: number): Promise<Admin> => {
    return AdminImpl.findByPk(userId);
  };

  createOne = async (user: Admin): Promise<number> => {
    return (await AdminImpl.create(user)).userId;
  };

  updateOne = async (user: Admin): Promise<number> => {
    const fields: (keyof Admin)[] = [];
    Object.keys(user).filter(k=> k !== 'userId').forEach(k => fields.push(k as keyof Admin));
    return (await AdminImpl.update(user,
      {
        where: {userId: user.userId},
        fields
      })).length;
  };

  deleteById = async (userId: number): Promise<number> => {
    return AdminImpl.destroy({
      where: { userId }
    });
  };

  findByUsername = async (username: string): Promise<Admin> => {
    return AdminImpl.findOne({
      where: {username}
    });
  };


  create = async (userList: Admin[]): Promise<number> => {
    return (await AdminImpl.bulkCreate(userList)).length;
  };

  updateAll: (user: Admin) => Promise<[number, Admin[]]>;

  updateRole: (userId: number, roles: Role[]) => Promise<boolean>;
}
