const router = require("express").Router();
//const pool = require("../mysql_pool");
const { format, addMonths } = require("date-fns");
const { db } = require("../firebase");
const {
  collection,
  getDocs,
  query,
  where,
  orderBy
} = require("firebase/firestore");

router.get("/", async (req, res) => {
  // 今日の日付を取得
  const today = new Date();
  const results = [];
  // 今日の日付をyyyy/mm/ddの形式の文字列に変換
  try {
    const dbCollection = collection(db, "reservation");
    const formattedToday = format(today, "yyyy/MM/dd");
    const q = query(
      dbCollection,
      where("reservation_date", ">=", formattedToday),
      orderBy("reservation_date")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      console.log(doc.data());
      results.push({
        ...doc.data()
      });
    });
    res.render("./index.ejs", {
      results: results
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
