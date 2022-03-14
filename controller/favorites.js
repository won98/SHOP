const db = require("../db/db");

module.exports = {
  FavoritesWrite: async (req, res) => {
    try {
      const { p_idx, id } = req.body;
      console.log("1");
      const sql = "insert into favorites(`p_idx`,`id`) value(?,?)";
      const data = [p_idx, id];
      const conn = await db.getConnection();
      const rows = await conn.query(sql, data);
      conn.release();
      res.send(rows);
    } catch (err) {
      console.log(err);
    }
  },
  Favorites_list: async (req, res) => {
    try {
      const { id } = req.body;
      console.log(id);
      const sql =
        "select * from products inner join favorites on products.p_idx = favorites.p_idx where favorites.id = ?";
      const data = [id];
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
