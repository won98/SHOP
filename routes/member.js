const express = require("express");
const router = express.Router();
const { memberController: controller } = require("../controller");

router.post("/signup", controller.Signup);
router.post("/signin", controller.Signin);
router.get("/information", controller.Information);
module.exports = router;
