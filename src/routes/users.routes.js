const express = require("express");
const {
  getUser,
  addUser,
  getAllUsers,
  editUser,
  deleteUser,
} = require("../controllers/user.controllers.js");

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/users", addUser);
router.get("/users/:id", getUser);
router.put("/users/:id", editUser);
router.delete("/users/:id", deleteUser);
module.exports = router;
