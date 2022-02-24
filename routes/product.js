const express = require("express");
const router = express.Router();
const { productController: controller } = require("../controller");
const multer = require("multer");
const upload = multer({ desk: "./uploads" });

router.post(
  "/additem",
  upload.fields([{ name: "image" }, { name: "detailimage" }]),
  controller.Additem,
  async (req, res) => {
    try {
      console.log(req.file);
      res.json(req.body);
    } catch (error) {
      throw error;
    }
  }
);

module.exports = router;
