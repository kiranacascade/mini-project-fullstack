const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = db.User;

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password, password_confirmation } = req.body;

      if (!username || !email || !password || !password_confirmation) throw "Please complete your data";

      if (password !== password_confirmation) throw "Password doesn't match";

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      const result = await user.create({
        username,
        email,
        password: hashPass,
      });

      res.status(200).send({
        status: true,
        message: "Register success",
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw "Please complete your data";

      const userExist = await user.findOne({
        where: {
          email,
        },
      });

      if (!userExist)
        throw {
          status: false,
          message: "User not found",
        };

      const isValid = await bcrypt.compare(password, userExist.password);

      if (!isValid) throw "Wrong password";

      const payload = {
        id: userExist.id,
        merchant_status: userExist.merchant_status,
      };

      const token = jwt.sign(payload, "jwt", { expiresIn: "1h" });

      res.status(200).send({
        status: true,
        message: "Login success",
        data: userExist,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};
