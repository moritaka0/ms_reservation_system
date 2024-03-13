const { format, addMonths } = require("date-fns");
const router = require("express").Router();
const pool = require("../mysql_pool");

router.get("/", (req, res) => {
  //EJSのパスの指定はviewsフォルダーからのパスを記載する

  // 今日の日付を取得
  const today = new Date();
  // 今日から1ヶ月後の日付を取得
  const nextMonth = addMonths(today, 1);
  // 今日の日付をyyyy/mm/ddの形式の文字列に変換
  const formattedToday = format(today, "yyyy/MM/dd");
  // 今日から1ヶ月後の日付をyyyy/mm/ddの形式の文字列に変換
  const formattedNextMonth = format(nextMonth, "yyyy/MM/dd");

  const selectQuery =
    "SELECT * from reservation where reservation_date >= ? and reservation_date <= ?";

  pool.query(
    selectQuery,
    [formattedToday, formattedNextMonth],
    (error, results, fields) => {
      if (error) {
        console.error("Error executing MySQL query:", error);
        res.status(500).send("Internal Server Error");
        return;
      }
      const reservationDateArr = results.map(row => row.reservation_date);
      res.render("./form/index.ejs", {
        startDate: formattedToday,
        endDate: formattedNextMonth,
        date: reservationDateArr
      });
    }
  );
});
module.exports = router;
