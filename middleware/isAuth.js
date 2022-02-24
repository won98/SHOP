const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = "" + process.env.ACCESS_KEY;
const db = require("../db/db");

module.exports = async (req, res, next) => {
  try {
    const token = req.get("x_auth");
    const decodedToken = jwt.verify(token, secretKey);
    const { name } = decodedToken;
    const data = [name];
    const sql = "select * from member where name = ?";
    const conn = await db.getConnection();
    const [rows] = await conn.query(sql, data);
    if (!rows) {
      return false;
    }
    next();
  } catch (err) {
    next(err);
  }
};
