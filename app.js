const express = require("express");
const app = express();
const cors = require("cors");
const compression = require("compression");
const port = process.env.PORT || 8000;
require("dotenv").config();
const Router = require("./routes");

app.use(express.json());
app.use(cors());
app.use("/img", express.static("./uploads"));
app.use(compression()); //메모리 최적화

app.use("/member", Router.memberRoute);
app.use("/product", Router.productRoute);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
