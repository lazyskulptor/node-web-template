import {Admin} from "../../model/user";
import  {DataTypes, Model, Optional} from "sequelize";
import {Role} from "../../model/enums/roles";
import conn from "../sequel_impl/conn";


const tbNm = 'admin';
interface AdminCreationAttributes extends Optional<Admin, "userId"> {}

export default class AdminImpl extends Model<Admin, AdminCreationAttributes> implements AdminCreationAttributes {
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
