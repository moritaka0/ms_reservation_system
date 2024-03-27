const router = require("express").Router();
const { format, addMonths } = require("date-fns");
const { db } = require("../firebase");
const {
  doc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs
} = require("firebase/firestore");

router.post("/", async (req, res) => {
  const deleteKey = req.body.deleteKey;
  try {
    await deleteDoc(doc(db, "reservation", deleteKey));
    console.log("Document successfully deleted!");
    //管理者画面を再描画するために再び全ての予約データを取得する
    const results = [];
    // 今日の日付を取得
    const today = new Date();
    // 今日の日付をyyyy/mm/ddの形式の文字列に変換
    const formattedToday = format(today, "yyyy/MM/dd");
    const dbCollection = collection(db, "reservation");
    const q = query(
      dbCollection,
      where("reservation_date", ">=", formattedToday),
      orderBy("reservation_date")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      console.log(doc.data());
      results.push({
        id: doc.id,
        ...doc.data()
      });
    });
    res.render("./admin/index.ejs", {
      results: results
    });
  } catch (error) {
    console.error("Error removing document: ", error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
