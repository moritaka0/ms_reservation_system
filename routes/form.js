const { format, addMonths } = require("date-fns");
const router = require("express").Router();
const { db } = require("../firebase");
const {
  collection,
  getDocs,
  query,
  where,
  orderBy
} = require("firebase/firestore");

//EJSのパスの指定はviewsフォルダーからのパスを記載する
router.get("/", async (req, res) => {
  let reservationDateArr = [];
  // 今日の日付を取得
  const today = new Date();
  // 今日から1ヶ月後の日付を取得
  const nextMonth = addMonths(today, 1);
  // 今日の日付をyyyy/mm/ddの形式の文字列に変換
  const formattedToday = format(today, "yyyy/MM/dd");
  // 今日から1ヶ月後の日付をyyyy/mm/ddの形式の文字列に変換
  const formattedNextMonth = format(nextMonth, "yyyy/MM/dd");
  try {
    const dbCollection = collection(db, "reservation");
    const q = query(
      dbCollection,
      where("reservation_date", ">=", formattedToday),
      where("reservation_date", "<=", formattedNextMonth),
      orderBy("reservation_date")
    );
    const querySnapshot = await getDocs(q);
    reservationDateArr = querySnapshot.docs.map(
      doc => doc.data().reservation_date
    );
    res.render("./form/index.ejs", {
      startDate: formattedToday,
      endDate: formattedNextMonth,
      date: reservationDateArr
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
