const express = require("express");
const router = express.Router();
const { commentController: controller } = require("../controller");

router.post("/comments", controller.Comments);
router.post("/list", controller.comment_list);
module.exports = router;
