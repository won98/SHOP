const express = require("express");
const router = express.Router();
const { favoritesController: controller } = require("../controller");

router.post("/favoriteswrite", controller.FavoritesWrite);
router.post("/list", controller.Favorites_list);
module.exports = router;
