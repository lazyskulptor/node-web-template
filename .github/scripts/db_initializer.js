const dbType= process.env.DB_TYPE;
const {Client} = require('pg');
const fs = require('fs');

var pgInitializer = async () => {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'secretpassword',
  });
  
  await client.connect();
  
  await client.query('CREATE USER webuser WITH PASSWORD \'test_db_password\'');
  console.log('user is created');

  await client.query('CREATE DATABASE web WITH OWNER = webuser');
  console.log('test db is created');
};

const pgSchemaSetter = async () => {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'webuser',
    password: 'test_db_password',
    database: 'web'
  });
  
  var sql = fs.readFileSync('.github/scripts/pg_init_database.sql');
  sql = sql.toString();
  
  await client.connect();
  await client.query(sql);
  console.log('db schema is set');
};

if (dbType === 'mysql' || dbType === 'mariadb') {

} else { //postgres
  (async () => {
    try {
      await pgInitializer();
      await pgSchemaSetter();
    } catch (e) {
      process.exit(1);
    }
    process.exit(0);
  })();
  // pgInitializer()
  //   .then(res => {
  //     pgSchemaSetter()
  //       .then(rr => process.exit(0))
  //       .catch(errr => process.exit(1));
  //   }).catch(err => {
  //     console.log(err);
  //     process.exit(1)
  //   });
}

