const { check, validationResult } = require("express-validator");

class AddTransactionValidator {
  static validateData() {
    return [
      check("name")
        .notEmpty()
        .withMessage("name is required!")
        .isString()
        .withMessage("name should be a string"),

      check("price")
        .notEmpty()
        .withMessage("price is required!")
        .isNumeric()
        .withMessage("price should be a Number"),

      check("description")
        .notEmpty()
        .withMessage("description is required!")
        .isString()
        .withMessage("description should be a string"),
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
module.exports = AddTransactionValidator;
