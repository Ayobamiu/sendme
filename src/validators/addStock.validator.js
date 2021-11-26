const { check, validationResult } = require("express-validator");

class AddStockValidator {
  static validateData() {
    return [
      check("title")
        .notEmpty()
        .withMessage("title is required!")
        .isString()
        .withMessage("title should be a string"),

      check("amount")
        .notEmpty()
        .withMessage("amount is required!")
        .isNumeric()
        .withMessage("amount should be a Number"),

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
module.exports = AddStockValidator;
