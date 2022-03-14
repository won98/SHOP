const express = require("express");
const router = express.Router();
const { boardController: controller } = require("../controller");

router.post("/", controller.Board);
router.get("/list", controller.Board_list);
router.post("/detail", controller.Board_detail);
router.post("/delete", controller.Board_delete);
router.post("/update", controller.Board_update);
module.exports = router;
