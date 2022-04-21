const express = require("express");
const router = express.Router();
const FavsController = require("./controller");

router.get("/", FavsController.getAllFavs);
router.get("/:id", FavsController.getFavById);
router.post("/", FavsController.createFav);
router.delete("/:id", FavsController.deleteFav);
router.put("/:id", FavsController.updateFav);

module.exports = router;
