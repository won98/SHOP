const db = require("../db/db");
const multer = require("multer");
const upload = multer({ desk: "./uploads" });

module.exports = {
  Additem: async (req, res) => {
    try {
      const { title, price, select, content } = req.body;
      const image = "/img/" + req.file.image[0].filename;
      const detailimage = "/img/" + req.file.detailimage[0].filename;
      const sql =
        "insert into shop_product(p_name,p_price,category,p_content,p_img,p_img2,main,deleted) values(?,?,?,?,?,?,?,?)";
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
};
