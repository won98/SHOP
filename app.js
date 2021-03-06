const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const compression = require("compression");
const helmet = require("helmet");

const port = process.env.PORT || 8000;
require("dotenv").config();
const Router = require("./routes");

app.use(express.json());
app.use(cors());
app.use("/img", express.static("./uploads"));
app.use(compression()); //메모리 최적화
app.use(helmet());

app.use("/member", Router.memberRoute);
app.use("/product", Router.productRoute);
app.use("/favorites", Router.favoritesRoute);
app.use("/bucket", Router.bucketRoute);
app.use("/email", Router.emailRoute);
app.use("/comment", Router.commentRoute);
app.use("/ask", Router.askRoute);
app.use("/answer", Router.answerRoute);
app.use("/board", Router.boardRoute);
app.use("/pay", Router.payRoute);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
