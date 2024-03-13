// mysql_pool.js MYSQLへの接続設定を記載
const mysql = require("mysql");

// MySQL接続情報
const dbConfig = {
  host: process.env.DB_ENDPOINT,
  user: process.env.UID,
  password: process.env.PASS,
  database: process.env.DB_NAME
};

// MySQL接続プールを作成
const pool = mysql.createPool(dbConfig);

// プールをエクスポート
module.exports = pool;
