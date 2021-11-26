const express = require("express");
const StockController = require("../controllers/stock.controller");
const AddStockValidator = require("../validators/addStock.validator");

const router = express.Router();

router.delete("/:stockId", StockController.deleteStock);
router.patch("/:stockId", StockController.updateStock);
router.post(
  "/",
  AddStockValidator.validateData(),
  AddStockValidator.myValidationResult,
  StockController.addStock
);
router.get("/", StockController.getStocks);

module.exports = router;
