const db = require("../db/db");

module.exports = {
  Comments: async (req, res) => {
    try {
      const { comment, id, b_idx } = req.body;
      const sql = "insert into commnets(comment,id,b_idx) values(?,?,?)";
      const data = [comment, id, b_idx];

      const conn = await db.getConnection();
      const rows = await conn.query(sql, data);
      conn.release();
      res.send(rows);
    } catch (err) {
      console.log(err);
    }
  },
  comment_list: async (req, res) => {
    try {
      const { b_idx } = req.body;
      console.log(b_idx);
      const sql = "select * from commnets where b_idx = ? ";
      const data = [b_idx];
      console.log(data);
      const conn = await db.getConnection();
      const [rows] = await conn.query(sql, data);
      conn.release();
      res.send(rows);
    } catch (err) {
      console.log(err);
    }
  },
};
