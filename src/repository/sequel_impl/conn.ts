import {Dialect, Options, Sequelize, Transaction} from 'sequelize';
import dotenv from "dotenv";

if (process.env.NODE_ENV === 'test') {
  dotenv.config();
}

const dbType = process.env.DB_TYPE as Dialect || 'postgres';
const host = process.env.DB_HOST || '127.0.0.1';
const port = process.env.DB_PORT;
const db = process.env.DB_NAME || 'web';
const username = process.env.DB_USER || 'webuser';
const pwd = process.env.DB_PWD || 'test_db_password';

const dbOpt: Options = {
  host,
  dialect: dbType
};

if (port) {
  dbOpt.port = +port;
}

const conn = new Sequelize(db, username, pwd, dbOpt);

(async () => {
  try {
    await conn.authenticate();
    console.info('DB Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export async function startTx(): Promise<Transaction> {
  return await conn.transaction();
}

export default conn;