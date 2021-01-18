const dbType= process.env.DB_TYPE;

var pgInitializer = async () => {
  const {Client} = require('pg');
  const fs = require('fs');
  
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'secretpassword',
  });
  
  var sql = fs.readFileSync('.github/scripts/pg_init_database.sql');
  sql = sql.toString();
  
  await client.connect();
  
  await client.query('CREATE USER webuser WITH PASSWORD \'test_db_password\'');
  console.log('user is created');

  await client.query('CREATE DATABASE web WITH OWNER = webuser');
  console.log('test db is created');
  
  await client.query(sql);
  console.log('db schema is set');
  
  process.exit(0);
};

if (dbType === 'mysql' || dbType === 'mariadb') {

} else { //postgres
  pgInitializer()
    .catch(err => {
      console.log(err);
      process.exit(1)
    });
}

