const express = require("express");
const router = express.Router();
const { answerController: controller } = require("../controller");

router.post("/", controller.QnaAnswer);
router.post("/list", controller.QnaAnswerList);
module.exports = router;
