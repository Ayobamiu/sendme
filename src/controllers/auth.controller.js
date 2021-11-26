const User = require("../models/users.model");
const bcrypt = require("bcryptjs");

class AuthController {
  static async signUpLite(req, res) {
    try {
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(400).send({
          error: "400 Bad request",
          message: "Email is taken",
        });
      }

      const user = new User({
        ...req.body,
        access: "admin",
      });
      const token = await user.generateAuthToken();
      await user.save();

      res.status(201).send(token);
    } catch (error) {
      res.status(500).send({
        error: "500 Internal server error",
        message: "Error saving User",
      });
    }
  }
  static async addWorkerLite(req, res) {
    try {
      const admin = await User.findById(req.user.id);
      if (admin && admin.access !== "admin") {
        return res.status(401).send({
          error: "401 unauthorized",
          message: "Only Admins can add workers",
        });
      }
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(400).send({
          error: "400 Bad request",
          message: "Email is taken",
        });
      }

      const user = new User({
        ...req.body,
        access: "worker",
      });
      await user.save();

      res.status(201).send({ email: user.email, password: req.body.password });
    } catch (error) {
      res.status(500).send({
        error: "500 Internal server error",
        message: "Error adding worker",
      });
    }
  }
  static async loginLite(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).send({
          error: "404 not found",
          message: "Email is not registered",
        });
      }

      //compare if the password matches the password for the user
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(404).send({
          error: "404 Credentials not a match",
          message: "Credential is not a match",
        });
      }

      const token = await user.generateAuthToken();
      res.send(token);
    } catch (error) {
      res
        .status(400)
        .send({ error: "400 Bad request", message: "Unable to login" });
    }
  }
  static async getUsers(req, res) {
    try {
      const users = await User.find();

      res.send(users);
    } catch (error) {
      res
        .status(500)
        .send({ error: "500 server error", message: "Error getting users" });
    }
  }
}
module.exports = AuthController;
