const router = require("express").Router();
const pool = require("../mysql_pool");

router.post("/", (req, res) => {
  const name = req.body.name;
  const roomNum = req.body.roomNum;
  const memberNum = req.body.memberNum;
  const reason = req.body.reason;
  const reserveDate = req.body.reserveDate;
  const insertQuery =
    "INSERT INTO reservation(reservation_date,name,roomNum,memberNum,reason) VALUES(?,?,?,?,?)";
  //EJSのパスの指定はviewsフォルダーからのパスを記載する
  pool.query(
    insertQuery,
    [reserveDate, name, roomNum, memberNum, reason],
    (error, results, fields) => {
      if (error) {
        console.error("Error inserting data:", error.stack);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.render("./complete/index.ejs");
    }
  );
});
module.exports = router;
