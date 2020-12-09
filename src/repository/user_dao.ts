import Admin from "../model/user";
import  {DataTypes, Model, Optional} from "sequelize";
import {Role} from "../model/enums/roles";
import conn from "./conn";


const tbNm = 'admin';
interface AdminCreationAttributes extends Optional<Admin, "userId"> {}

class AdminImpl extends Model<Admin, AdminCreationAttributes> implements AdminCreationAttributes {
  department: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  roles: Role[];
  userId: number;
  username: string;
}

AdminImpl.init({
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: { type: DataTypes.STRING },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  roles: { type: new DataTypes.ARRAY(DataTypes.ENUM(Role.SUPER_R, Role.SUPER_W, Role.MGR_R, Role.MGR_W )) },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  }, {
  sequelize: conn,
  tableName: tbNm,
  underscored: true,
  timestamps: false
});

export function findAdmin(user: Admin): Promise<Admin> {
  return AdminImpl.findOne();
}

export async function insertAdmin(user: Admin): Promise<number> {
  return (await AdminImpl.create(user)).userId;
}

export async function deleteAdminById(userId: number): Promise<number> {
  return AdminImpl.destroy({
    where: { userId }
  });
}

export async function findAdminById(userId: number): Promise<Admin> {
  return AdminImpl.findByPk(userId);
}

export async function updateAdmin(userId: number, admin: Admin): Promise<[number, Admin[]]> {
  const fields: (keyof Admin)[] = [];
  Object.keys(admin).filter(k=> k !== 'userId').forEach(k => fields.push(k as keyof Admin));
  return AdminImpl.update(admin,
    {
      where: {userId},
      fields
    });
}

export async function findUserByUsername(username: string): Promise<Admin> {
  return await AdminImpl.findOne({
    where: {username}
  });
}

