const db = require("../db/db");

module.exports = {
  Board: async (req, res) => {
    try {
      const { id, title, content } = req.body;
      const sql = "insert into board(id,title,content,date) value(?,?,?,NOW())";
      const data = [id, title, content];
      const conn = await db.getConnection();
      const rows = await conn.query(sql, data);
      conn.release();
      res.send(rows);
    } catch (err) {
      throw console.log(err);
    }
  },

  Board_list: async (req, res) => {
    try {
      const sql = "select *from board";
      const conn = await db.getConnection();
      const [rows] = await conn.query(sql);
      conn.release();
      res.send(rows);
    } catch (err) {
      throw console.log(err);
    }
  },

  Board_detail: async (req, res) => {
    try {
      const { idx } = req.body;
      console.log(idx);
      const sql = "select * from board where idx=?";
      const data = [idx];
      const conn = await db.getConnection();
      const [rows] = await conn.query(sql, data);
      conn.release();
      res.send(rows);
    } catch (err) {
      throw console.log(err);
    }
  },
  Board_delete: async (req, res) => {
    try {
      const { idx } = req.body;
      console.log(idx);
      const sql = "delete from board where idx=?";
      const data = [idx];
      const conn = await db.getConnection();
      const [rows] = await conn.query(sql, data);
      conn.release();
      res.send(rows);
    } catch (err) {
      throw console.log(err);
    }
  },
  Board_update: async (req, res) => {
    const { idx, title, content } = req.body;
    console.log(idx);
    const sql = "update board set title=?, content=? where idx=?";
    const data = [title, content, idx];
    const conn = await db.getConnection();
    const [rows] = await conn.query(sql, data);
    conn.release();
    res.send(rows);
  },
};
