const router = require("express").Router();
const pool = require("../mysql_pool");
const { format, addMonths } = require("date-fns");

router.get("/", (req, res) => {
  // 今日の日付を取得
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
    res.render("./index.ejs", {
      results: results
    });
  });
});
module.exports = router;
