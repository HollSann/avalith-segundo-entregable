const jwt = require("jsonwebtoken");

const checkAdmin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.decode(token, { complete: true });
  const e = new Error("access denied. Only the admin owns this property");
  const user = decoded.payload;
  if (!decoded || decoded.payload.user.role !== "ADMIN") {
    next(e)
  } else {
    next();
  }
};
const checkLoggedIn = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.decode(token, { complete: true });
  const e = new Error("access denied, please try again");
  const user = decoded.payload;
  if (!decoded || !token) {
    next(e);
  } else {
    next();
  }
};
const checkLoggedUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.decode(token, { complete: true });
  const e = new Error("access denied, please try again");
  if (!decoded) {
    next(e);
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
