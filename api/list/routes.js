const express = require("express");
const router = express.Router();
const ListController = require("./controller");
const {auth} = require("../../auth")

router.get("/", ListController.getAllLists);
router.get("/:id", ListController.getListById);
router.post("/", auth, ListController.createList);
router.delete("/:id", ListController.deleteList);
router.put("/:id", ListController.updateList);

module.exports = router;
