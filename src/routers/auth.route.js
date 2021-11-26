const express = require("express");
const AuthController = require("../controllers/auth.controller");
const SignUpValidator = require("../validators/signUp.validator");
const auth = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/login", AuthController.loginLite);
router.post(
  "/add-worker",
  auth,
  SignUpValidator.validateData(),
  SignUpValidator.myValidationResult,
  AuthController.addWorkerLite
);
router.post(
  "/admin",
  SignUpValidator.validateData(),
  SignUpValidator.myValidationResult,
  AuthController.signUpLite
);
router.get("/", AuthController.getUsers);

module.exports = router;
