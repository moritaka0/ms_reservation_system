const router = require("express").Router();

router.post("/", (req, res) => {
  const name = req.body.name;
  const roomNum = req.body.roomNum;
  const memberNum = req.body.memberNum;
  const reason = req.body.reason;
  const reserveDate = req.body.reserveDate;

  console.log(name + memberNum + roomNum + reason + reserveDate);

  //EJSのパスの指定はviewsフォルダーからのパスを記載する
  res.render("./confirm/index.ejs", {
    name: name,
    roomNum: roomNum,
    memberNum: memberNum,
    reason: reason,
    reserveDate: reserveDate
  });
});
module.exports = router;
