const express = require("express");
const router = express.Router();
const { askController: controller } = require("../controller");

router.post("/", controller.Qna);
router.get("/adminqna", controller.AdminQna);
router.post("/adminqnaid", controller.AdminQna_id);
module.exports = router;
