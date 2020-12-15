import  {QueryTypes} from "sequelize";
import conn from "./conn";
import {SettingDBDao} from "../setting_db_dao";


export class SettingDBDaoSequel implements SettingDBDao {
  truncateTb = async (tbNm: string): Promise<boolean> => {
    let res: number;
    res = (await conn.query(`TRUNCATE ${tbNm}`, {
      type: QueryTypes.BULKDELETE
    }));
    return res > 0;
  }
}

