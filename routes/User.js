const mongoose = require("mongoose");
const User = mongoose.model("user");
const Order = mongoose.model("order");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuthorized = require("../middlewares/Authorized");

module.exports = (app) => {
  // Register
  app.post("/api/register", async (req, res) => {
    const checkEmailExist = await User.findOne({ email: req.body.email });
    if (checkEmailExist) {
      res
        .status(422)
        .json({ status: "fail", msg: "This email has already taken." });
    }

    const user = await new User();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = bcrypt.hashSync(req.body.password);
    user.save();

    let token = jwt.sign({ userID: user._id }, "secret");
    res.status(200).json({ status: "success", msg: "Register success." });
  });

  // Login
  app.post("/api/login", async (req, res) => {
    const login = await User.findOne({ email: req.body.email });
    if (login) {
      if (bcrypt.compareSync(req.body.password, login.password)) {
        let token = jwt.sign({ userID: login._id }, "secret");
        res.status(200).json({ status: "success", data: token });
      } else {
        res.status(422).json({ status: "fail", msg: "Wrong password" });
      }
    } else {
      res.status(422).json({ status: "fail", msg: "Wrong email." });
    }
  });

  // Get user profile
  app.get("/api/get-user-info", isAuthorized, async (req, res) => {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    const myInfo = await User.findOne({ id: decoded.userId });

    res.status(200).json({ status: "success", data: myInfo });
  });

  // Get user orders
  app.get("/api/get-user-order", isAuthorized, async (req, res) => {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    const order = await Order.find({ user_id: decoded.userID });
    res.status(200).json({ status: "success", data: order });
  });
};
