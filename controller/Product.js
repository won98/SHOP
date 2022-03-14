const db = require("../db/db");
const multer = require("multer");

module.exports = {
  Additem: async (req, res) => {
    try {
      let { title, price, select, content } = req.body;
      let image = "/img/" + req.files.image[0].filename;
      console.log(req.files);
      const detailimage = "/img/" + req.files.detailimage[0].filename;
      const sql =
        "insert into products(`p_name`,`p_price`,`category`,`p_content`,`p_img1`,`p_img2`,`main`,`deleted`) values(?,?,?,?,?,?,?,?)";
      const data = [
        title,
        price,
        select,
        content,
        image,
        detailimage,
        "no",
        "no",
      ];
      console.log(data);
      const conn = await db.getConnection();
      const rows = await conn.query(sql, data);
      if (rows) {
        res.send("1");
      } else {
        res.send("0");
      }
    } catch (err) {
      throw err;
    }
  },
  Product_List: async (req, res) => {
    try {
      const { p_idx } = req.body;
      console.log(p_idx);
      const sql = "select *from products where deleted=?";
      const data = [`no`];
      console.log("2");
      const conn = await db.getConnection();
      const [rows] = await conn.query(sql, data);
      console.log(rows);
      conn.release();
      res.send(rows);
    } catch (err) {
      console.log(err);
    }
  },

  Product_delete_list: async (req, res) => {
    try {
      const { p_idx } = req.body;
      console.log(p_idx);
      const sql = "select *from products where deleted=?";
      const data = ["yes"];
      const conn = await db.getConnection();
      const [rows] = await conn.query(sql, data);
      conn.release();
      res.send(rows);
    } catch (err) {
      console.log(err);
    }
  },
  Product_detail_list: async (req, res) => {
    try {
      const { p_idx } = req.body;
      console.log(p_idx);
      const conn = await db.getConnection();
      const sql = "SELECT *from products where p_idx =? and deleted = ?";
      const data = [p_idx, "no"];
      const [rows] = await conn.query(sql, data);
      conn.release();
      res.status(200).json({ result: rows });
    } catch (err) {
      console.log(err);
    }
  },
  Product_update: async (req, res) => {
    try {
      const obj = JSON.parse(JSON.stringify(req.files));
      var image;
      var detailimage;

      console.log(obj.image, obj.detailImage);
      console.log(obj);
      if (!obj.image && obj.detailimage) {
        console.log("1");
        image = req.body.image;
        detailimage = "/img/" + req.files.detailimage[0].filename;
      } else if (obj.image && !obj.detailimage) {
        console.log("11");
        image = "/img/" + req.files.image[0].filename;
        detaileimage = req.body.detaileimage;
      } else if (obj.image && obj.detailimage) {
        console.log("111");
        image = "/img/" + req.files.image[0].filename;
        detailimage = "/img/" + req.files.detailimage[0].filename;
      } else {
        console.log("1111");
        image = req.body.image;
        detaileimage = req.body.detaileimage;
      }
      const { p_idx, title, price, select, content } = req.body;
      const sql =
        "update products set p_name=?, p_price=?, category=?,p_content=?, p_img1=?, p_img2=?, main=?,deleted=?  where p_idx=?";
      const data = [
        title,
        price,
        select,
        content,
        image,
        detailimage,
        "no",
        "no",
        p_idx,
      ];
      const conn = await db.getConnection();
      const rows = await conn.query(sql, data);
      conn.release();
      if (rows) {
        res.send("1");
      } else {
        res.send("0");
      }
    } catch (err) {
      console.log(err);
    }
  },

  Product_delete: async (req, res) => {
    try {
      const { p_idx } = req.body;
      const data = [p_idx];
      console.log(p_idx);
      const conn = await db.getConnection();
      const sql = "delete from products where p_idx = ?";
      const [rows] = await conn.query(sql, data);
      conn.release();
      res.send(rows);
    } catch (err) {
      console.log(err);
    }
  },

  Search: async (req, res) => {
    try {
      const { result } = req.query;
      console.log(result);
      const sql = 'select * from shop_product where p_name like "%"?"%"';
      console.log(sql);
      const data = [result];
      const conn = await db.getConnection();
      const rows = await conn.query(sql, data);
      conn.release();
      res.send(rows);
    } catch (err) {
      console.log(err);
    }
  },

  Category: async (req, res) => {
    try {
      const { value } = req.query;
      console.log(value);
      const sql = "select * from products where category = ? and deleted=?";
      const data = [value, "no"];
      const conn = await db.getConnection();
      const [rows] = await conn.query(sql, data);
      console.log(rows);
      conn.release();
      res.send(rows);
    } catch (err) {
      console.log(err);
    }
  },
};
