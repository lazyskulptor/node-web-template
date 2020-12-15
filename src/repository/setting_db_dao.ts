import {SettingDBDaoSequel} from "./sequel_impl/setting_db_sequel";

export default function SettingDBDaoFactory(): SettingDBDao {
  // TODO: 2020-12-15 check DBType
  if (true) {
    return new SettingDBDaoSequel();
  }
}


export interface SettingDBDao {
  truncateTb: (tbNm: string) => Promise<boolean>
}
