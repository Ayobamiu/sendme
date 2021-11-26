const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const Stock = require("../models/stock.model");

class StockController {
  static async addStock(req, res) {
    try {
      const stock = await Stock.create({ ...req.body });

      res.status(201).send(stock);
    } catch (error) {
      res
        .status(500)
        .send({ error: "500 server error", message: "Error creating stock" });
    }
  }
  static async updateStock(req, res) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["count", "title", "amount", "description"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid Updates" });
    }
    try {
      const stock = await Stock.findById(req.params.stockId);
      updates.forEach((update) => (stock[update] = req.body[update]));
      await stock.save();
      res.send(stock);
    } catch (error) {
      res
        .status(500)
        .send({ error: "500 server error", message: "Error udating stock" });
    }
  }
  static async deleteStock(req, res) {
    try {
      const stock = await Stock.findByIdAndDelete(req.params.stockId);
      res.send(stock);
    } catch (error) {
      res
        .status(500)
        .send({ error: "500 server error", message: "Error deleting stock" });
    }
  }
  static async getStocks(req, res) {
    try {
      const stocks = await Stock.find();

      res.send(stocks);
    } catch (error) {
      res
        .status(500)
        .send({ error: "500 server error", message: "Error getting stocks" });
    }
  }
}
module.exports = StockController;
