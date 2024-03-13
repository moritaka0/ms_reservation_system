const router = require("express").Router();
const pool = require("../mysql_pool");
const { format, addMonths } = require("date-fns");

router.post("/", (req, res) => {
  const deleteKey = req.body.deleteKey;
  const deleteQuery = "DELETE FROM reservation WHERE reservation_date = ?"; // レコードを削除するクエリ
  pool.query(deleteQuery, [deleteKey], (error, results, fields) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).send("Internal Server Error");
      return;
    }
    //管理者画面を再描画するために再び全ての予約データを取得する
    const today = new Date();
    // 今日の日付をyyyy/mm/ddの形式の文字列に変換
    const formattedToday = format(today, "yyyy/MM/dd");
    const selectQuery =
      "SELECT * from reservation where reservation_date >= ? order by reservation_date";
    pool.query(selectQuery, [formattedToday], (error, results, fields) => {
      if (error) {
        console.error("Error executing MySQL query:", error);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.render("./admin/index.ejs", {
        results: results
      });
    });
  });
});
module.exports = router;
