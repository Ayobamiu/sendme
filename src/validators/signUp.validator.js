const { check, validationResult } = require("express-validator");

class SignUpValidator {
  static validateData() {
    return [
      check("email")
        .notEmpty()
        .withMessage("Email is required!")
        .isEmail()
        .withMessage("Email must be valid!"),
      check("password")
        .notEmpty()
        .withMessage("Password is required!")
        .isString()
        .withMessage("Password should be a string"),
      check("name")
        .notEmpty()
        .withMessage("name is required!")
        .isString()
        .withMessage("name should be a string"),
    ];
  }

  static async myValidationResult(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errArr = errors.array().map(({ msg }) => msg);
      return res.status(400).json({
        status: "400 Invalid Request",
        error: "Request contains invalid parameters",
        errors: errArr,
      });
    }
    return next();
  }
}
module.exports = SignUpValidator;
