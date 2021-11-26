const express = require("express");
const TransactionController = require("../controllers/transaction.controller");
const AddTransactionValidator = require("../validators/addTransaction.validator");

const router = express.Router();

router.post(
  "/",
  AddTransactionValidator.validateData(),
  AddTransactionValidator.myValidationResult,
  TransactionController.addTransaction
);
router.post("/get", TransactionController.getTransactions);

module.exports = router;
