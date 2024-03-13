const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

//EJSを利用するための宣言
app.set("view engine", "ejs");

//リクエストのパスに応じたルーティング設定
app.use("/", require("./routes/index.js"));
app.use("/form", require("./routes/form.js"));
app.use("/confirm", require("./routes/confirm.js"));
app.use("/complete", require("./routes/complete.js"));
app.use("/login", require("./routes/login.js"));
app.use("/admin", require("./routes/admin.js"));
app.use("/delete", require("./routes/delete.js"));

app.listen(3000);
