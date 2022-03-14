const db = require("../db/db");

module.exports = {
  Qna: async (req, res) => {
    try {
      const { id, title, content } = req.body;
      const sql =
        "insert into ask (id,title,content,ask_data) value(?,?,?,NOW())";
      const data = [id, title, content];
      const conn = await db.getConnection();
      const rows = await conn.query(sql, data);
      conn.release();
      res.send(rows);
    } catch (err) {
      console.log(err);
    }
  },
  AdminQna: async (req, res) => {
    try {
      const sql = "select * from ask";
      const conn = await db.getConnection();
      const [rows] = await conn.query(sql);
      conn.release();
      res.send(rows);
    } catch (err) {
      console.log(err);
    }
  },
  AdminQna_id: async (req, res) => {
    try {
      const { id } = req.body;
      const sql = "select * from ask where id=?";
      const data = [id];
      const conn = await db.getConnection();
      const [rows] = await conn.query(sql, data);
      conn.release();
      res.send(rows);
    } catch (err) {
      console.log(err);
    }
  },
};
