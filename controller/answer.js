const db = require("../db/db");

module.exports = {
  QnaAnswer: async (req, res) => {
    try {
      const { id, title, content } = req.body;
      const sql =
        "insert into answer(id,title,content,answerd, answerd_data) values(?,?,?,?,NOW())";
      const data = [id, title, content, "yes"];
      const conn = await db.getConnection();
      const rows = await conn.query(sql, data);
      conn.release();
      res.send(rows);
    } catch (err) {
      throw console.log(err);
    }
  },
  QnaAnswerList: async (req, res) => {
    try {
      const sql = "select * from answer where answerd = ?";
      const data = ["yes"];
      console.log(data);
      const conn = await db.getConnection();
      const [rows] = await conn.query(sql, data);
      conn.release();
      res.send(rows);
    } catch (err) {
      throw console.log(err);
    }
  },
};
