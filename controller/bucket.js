const db = require("../db/db");

module.exports = {
  BucketWrite: async (req, res) => {
    try {
      const { id } = req.body;
      const sql = "insert into bucket(`id`) values(?)";
      const data = [id];
      const conn = await db.getConnection();
      const rows = await conn.query(sql, data);
      conn.release();
      res.send(rows);
    } catch (err) {
      console.log(err);
    }
  },
  Bucket_list: async (req, res) => {
    try {
      const { id } = req.body;
      console.log(id);
      const sql =
        "select * from products inner join bucket on products.p_idx = bucket.p_idx where bucket.id = ?";
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
