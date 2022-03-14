const router = require("express").Router();
const { payController: controller } = require("../controller");

router.post("/geturl", controller.GetURI);

router.post("/pay_ok", controller.Pay_ok);

module.exports = router;
