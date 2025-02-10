const mysql = require('mysql2/promise');

// Create the connection pool. The pool-specific settings are the defaults
module.exports = mysql.createPool({
  // PRIVALOMA surašyti savo DB prisijungimo nustatymus
  host: process.env.DB_HOST ?? 'localhost',
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? 'js3_express_db',
  port: process.env.DB_PORT ?? '3306',
  
  // kiti mysql pool nustatymai
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});