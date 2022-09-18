const db = require("../models/index.js");
const { cars, users } = db;

const getAllCars = (req, res, next) => {
  cars
    .findAll({ include: users })
    .then((cars) => res.status(200).send(cars))
    .catch((error) => next(error));
};

const getCar = (req, res, next) => {
  const id = req.params.id;
  cars
    .findOne({ where: { id }, include: users })
    .then((cars) => res.status(200).send(cars))
    .catch((err) => next(err));
};

const createCar = (req, res, next) => {
  cars
    .create(req.body)
    .then((cars) => res.status(201).send("cars was Created successfully"))
    .catch((err) => next(err));
};

const updateCar = (req, res, next) => {
  const id = req.params.id;
  const newcar = req.body;
  cars
    .update(newcar, { where: { id } })
    .then((cars) => res.status(200).send("cars was updated successfully"))
    .catch((err) => next(err));
};

const deleteCar = (req, res, next) => {
  const id = req.params.id;
  cars
    .destroy({ where: { id } })
    .then(() => res.status(200).send("cars was deleted successfully"))
    .catch((err) => next(err));
};

module.exports = {
  getAllCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
};
