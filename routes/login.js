const router = require("express").Router();

router.get("/", (req, res) => {
  const errMsg = "";
  res.render("./login/index.ejs", { errMsg: errMsg });
});
module.exports = router;
