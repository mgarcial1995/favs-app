const express = require("express");
const router = express.Router();
const FavsController = require("./controller");
const {auth} = require("../../auth")

router.get("/", auth, FavsController.getAllFavs);
router.get("/:id", auth, FavsController.getFavById);
router.post("/", auth, FavsController.createFav);
router.delete("/:id", auth, FavsController.deleteFav);
router.put("/:id", FavsController.updateFav);

module.exports = router;
