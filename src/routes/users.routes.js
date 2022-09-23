const express = require("express");
const {
  getUser,
  userRegistration,
  getAllUsers,
  editLoggedUser,
  deleteUser,
  userLogin,
  editUser,
} = require("../controllers/user.controllers.js");

const {
  checkAdmin,
  checkLoggedIn,
  checkLoggedUser,
} = require("../middlewares/checkUser.js");

const router = express.Router();

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.get("/users", checkLoggedIn, getAllUsers);
router.get("/users/:id", checkLoggedIn, getUser);
router.put("/users/editme", checkLoggedUser, editLoggedUser);
router.put("/users/:id", checkAdmin, editUser);
router.delete("/users/:id", checkAdmin, deleteUser);

module.exports = router;
