const db = require("../db/db");
const argon2 = require("argon2");
const { createToken, creatRefreshToken } = require("../utils/jwt");
module.exports = {
  Signup: async (req, res) => {
    try {
      const password = await argon2.hash(req.body.password);
      const data = [req.body.name, password, req.body.email];
      console.log(data);
      const sql = "insert into member(`name`,`password`,`email`) values(?,?,?)";
      const conn = await db.getConnection();
      await conn.query(sql, data);
      conn.release();
      return res.status(200).send("success");
    } catch (error) {
      throw error;
    }
  },

  Signin: async (req, res) => {
    try {
      const data = [req.body.name];
      const sql = `SELECT * from member where name = ?`;
      const conn = await db.getConnection();
      const [rows] = await conn.query(sql, data);
      conn.release();
      console.log("rows", rows[0].password);
      const compare = await argon2.verify(rows[0].password, req.body.password);
      console.log(compare);
      if (compare == true) {
        const token = createToken(rows[0].name);
        const retoken = creatRefreshToken(rows[0].name);
        return res.send([token, retoken]);
      } else {
        throw res.send("password Wrong");
      }
    } catch (error) {
      console.log(error);
    }
  },
};
