const jwt = require("jsonwebtoken");

const checkAdmin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.decode(token, { complete: true });
  const e = new Error("Access denied. Only the admin owns this property");
  if (!decoded || decoded.payload.user.role !== "ADMIN") {
    next(res.status(401)+e)
  } else {
    next();
  }
};
const checkLoggedIn = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.decode(token, { complete: true });
  const e = new Error("Yout need to be logged-in, please try again");
  if (!decoded || !token) {
    next(res.status(401)+e);
  } else {
    next();
  }
};
const checkLoggedUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.decode(token, { complete: true });
  const e = new Error("You need to be logged-in, please try again");
  if (!decoded) {
    next(res.status(401)+e);
  } else {
    req.user = decoded.payload.user;
    next();
  }
};

module.exports = {
  checkAdmin,
  checkLoggedIn,
  checkLoggedUser,
};
