// mysql_pool.js MYSQLへの接続設定を記載
const mysql = require("mysql");

// MySQL接続情報
const dbConfig = {
  host: "reservation-system-db.cusmiz3h0lbc.ap-northeast-1.rds.amazonaws.com",
  user: "admin",
  password: "adminadmin",
  database: "reservation_system_db"
};

// MySQL接続プールを作成
const pool = mysql.createPool(dbConfig);

// プールをエクスポート
module.exports = pool;
