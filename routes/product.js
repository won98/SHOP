const express = require("express");
const router = express.Router();
const { productController: controller } = require("../controller");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });

router.post(
  "/additem",
  upload.fields([{ name: "image" }, { name: "detailimage" }]),
  controller.Additem
  // async (req, res) => {
  //   try {
  //     console.log(req.file);
  //     res.json(req.body);
  //   } catch (error) {
  //     throw error;
  //   }
  // }
);
router.get("/list", controller.Product_List);
router.get("/deletelist", controller.Product_delete_list);
router.post("/detaillist", controller.Product_detail_list);
router.post(
  "/update",
  upload.fields([{ name: "image" }, { name: "detailimage" }]),
  controller.Product_update
);
router.post("/delete", controller.Product_delete);
router.get("/search", controller.Search);
router.get("/category", controller.Category);
module.exports = router;
