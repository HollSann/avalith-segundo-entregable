const express = require("express");
const {
  getAllCars,
  createCar,
  getCar,
  updateCar,
  deleteCar,
} = require("../controllers/car.controllers");
const {  checkAdmin } = require("../middlewares/checkUser");
const router = express.Router();

router.get("/cars", getAllCars);
router.post("/cars", createCar);
router.get("/cars/:id", getCar);
router.put("/cars/:id", checkAdmin, updateCar);
router.delete("/cars/:id", checkAdmin, deleteCar);

module.exports = router;
