const jwt = require("jsonwebtoken");

module.exports = function isAuthorized(req, res, next) {
  if (typeof req.headers.authorization !== "undefined") {
    let token = req.headers.authorization;
    jwt.verify(token, "secret", (err, user) => {
      if (err) {
        res.status(500).json({ error: "Not Authorized" });
        throw new Error("Not Authorized");
      }
      return next();
    });
  } else {
    res.status(500).json({ error: "Not Authorized" });
    throw new Error("Not Authorized");
  }
};
