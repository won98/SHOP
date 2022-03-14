const express = require("express");
const router = express.Router();
const { bucketController: controller } = require("../controller");

router.post("/", controller.BucketWrite);
router.post("/list", controller.Bucket_list);
module.exports = router;
