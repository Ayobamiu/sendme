const Transaction = require("../models/transaction.model");

class TransactionController {
  static async addTransaction(req, res) {
    try {
      const transaction = await Transaction.create({ ...req.body });

      res.send(transaction);
    } catch (error) {
      res.status(500).send({
        error: "500 server error",
        message: "Error creating transaction",
      });
    }
  }

  static async getTransactions(req, res) {
    try {
      const data = {};
      if (req.body.startDate) {
        data.$gte = req.body.startDate;
      }
      if (req.body.endDate) {
        data.$lte = req.body.endDate;
      }
      const transactions = await Transaction.find({ ...data });

      res.send(transactions);
    } catch (error) {
      res.status(500).send({
        error: "500 server error",
        message: "Error getting transactions",
      });
    }
  }
}
module.exports = TransactionController;
