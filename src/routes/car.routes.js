const express = require("express");
const {
  getAllCars,
  createCar,
  getCar,
  updateCar,
  deleteCar,
} = require("../controllers/car.controllers");

const router = express.Router();

router.get("/cars", getAllCars);
router.post("/cars", createCar);
router.get("/cars/:id", getCar);
router.put("/cars/:id", updateCar);
router.delete("/cars/:id", deleteCar);
module.exports = router;
