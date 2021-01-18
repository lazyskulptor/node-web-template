const dbType= process.env.DB_TYPE;

if (dbType === 'mysql' || dbType === 'mariadb') {

} else { //postgres
  const {Client} = require('pg');
  
  const client = new Client({
    host: 'postgres',
    port: 5432,
    user: 'postgres',
    password: 'secretpassword!!',
  });
  
  var sql = fs.readFileSync('pg_setupe_db.sql').toString();
  
  client.connect((err, client, done) => {
    if(err){
      console.log('error: ', err);
      process.exit(1);
    }
    client.query(sql, function(err, result){
      done();
      if(err){
        console.log('error: ', err);
        process.exit(1);
      }
      process.exit(0);
    });
  });
  
}