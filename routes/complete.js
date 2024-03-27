const router = require("express").Router();
const { db } = require("../firebase");
const { collection, addDoc } = require("firebase/firestore");

router.post("/", async (req, res) => {
  const name = req.body.name;
  const roomNum = req.body.roomNum;
  const memberNum = req.body.memberNum;
  const reason = req.body.reason;
  const reserveDate = req.body.reserveDate;
  try {
    const dbCollection = collection(db, "reservation");
    await addDoc(dbCollection, {
      reservation_date: reserveDate,
      name: name,
      roomNum: roomNum,
      memberNum: memberNum,
      reason: reason
    });
    res.render("./complete/index.ejs");
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
