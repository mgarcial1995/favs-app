const express = require("express");
const router = express.Router();
const UserController = require("./controller");

router.get("/", UserController.getAllUsers);
router.post("/signin", UserController.signinUser);
router.post("/signup", UserController.signupUser);
router.delete("/deleteAll", UserController.deleteAllUsers);
router.put("/update/:id", UserController.updateUser);

module.exports = router;
