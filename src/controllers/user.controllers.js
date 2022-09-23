require("dotenv").config;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/index.js");
const { users, cars } = db;

const userRegistration = (req, res, next) => {
  let body = req.body;
  let { email, password, role } = body;
  users
    .create({
      email,
      password: bcrypt.hashSync(password, 10),
      role: role || "USER",
    })
    .then((users) =>
      res.status(201).send("The user has been successfully registered")
    )
    .catch((err) => next(err));
};
const userLogin = (req, res, next) => {
  let { email, password } = req.body;
  users
    .findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        console.log("Wrong email or password");
        res.status(400).send("Wrong email or password");
      } else if (!bcrypt.compareSync(password, user.password)) {
        console.log("Wrong email or password");
        res.status(400).send("Wrong email or password");
      } else {
        console.log("Logged in");
        let token = jwt.sign(
          {
            user: user,
          },
          process.env.SEED_AUTHENTICATION,
          {
            expiresIn: process.env.TOKEN_EXPIRATION,
          }
        );
        res.json({
          ok: true,
          user: user,
          token,
        });
      }
    })

    .catch((err) => {
      next(err);
    });
};
const getAllUsers = (req, res, next) => {
  users
    .findAll({ include: cars })
    .then((users) => res.status(200).send(users))
    .catch((error) => next(error));
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
  const changes = req.body;
  users
    .update(changes, { where: { id } })
    .then((users) => res.status(200).send("The User was successfully updated"))
    .catch((err) => next(err));
};
const editLoggedUser = (req, res, next) => {
  const changes = req.body;
  const id = req.user.id;
  users
    .update(changes, { where: { id } })
    .then((users) =>
      res.status(200).send("Your profile was successfully updated")
    )
    .catch((err) => next(err));
};
const deleteUser = (req, res, next) => {
  const id = req.params.id;
  users
    .destroy({ where: { id } })
    .then((users) => res.status(200).send("The user was successfully deleted"))
    .catch((err) => next(err));
};

module.exports = {
  getAllUsers,
  userRegistration,
  userLogin,
  getUser,
  editLoggedUser,
  editUser,
  deleteUser,
};
