const db = require("../models/index.js");
const { users, cars } = db;

const getAllUsers = (req, res, next) => {
  users
    .findAll({ include: cars })
    .then((users) => res.status(200).send(users))
    .catch((error) => next(error));
};

const addUser = (req, res, next) => {
  users
    .create(req.body)
    .then((users) => res.status(201).send("users Created"))
    .catch((err) => next(err));
};

const getUser = (req, res, next) => {
  const id = req.params.id;
  users
    .findOne({
      where: { id },
      include: cars,
    })
    .then((users) => res.status(200).send(users))
    .catch((err) => next(err));
};
const editUser = (req, res, next) => {
  const id = req.params.id;
  const newUser = req.body;
  users
    .update(newUser, { where: { id } })
    .then((users) => res.status(200).send("users Updated"))
    .catch((err) => next(err));
};
const deleteUser = (req, res, next) => {
  const id = req.params.id;
  users
    .destroy({ where: { id } })
    .then((users) => res.status(200).send("users Deleted"))
    .catch((err) => next(err));
};
module.exports = { getAllUsers, addUser, getUser, editUser, deleteUser };
