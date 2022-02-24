const jwt = require("jsonwebtoken");
const { createToken } = require("../utils/jwt");
const db = require("../db/db");

const createToken = (payload) => {
  console.log("createToken");
  const token = jwt.sign({ name: payload.toString() }, secretKey, {
    algorithm: "HS256",
    expiresIn: "30m",
  });
  return token;
};

module.exports = async (req, res, next) => {
  try {
    const refreshtoken = req.get("r_x_auth");

    if (!refreshtoken) {
      return false;
    }

    const decodedToken = jwt.verify(refreshtoken, R_ACCESS_KEY);
    const data = [decodedToken.name];

    const sql = "select * from member where name = ?";

    const conn = await db.getConnection();
    const [rows] = await conn.query(sql, data);
    if (rows) {
      const newtoken = createToken(rows[0].name);
      res.send(newtoken);
    } else {
      return false;
    }
  } catch (err) {
    next(err);
  }
};
