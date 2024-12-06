const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (!user) {
      return res.status(404).send({
        message: "User not found."
      });
    }

    // Cek langsung nilai role dari user
    if (user.role === 'admin') {
      next(); // Jika role adalah admin, lanjutkan ke middleware berikutnya
    } else {
      return res.status(403).send({
        message: "Require Admin Role!"
      });
    }
  }).catch(err => {
    return res.status(500).send({
      message: "Unable to validate user role."
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin
};

module.exports = authJwt;
