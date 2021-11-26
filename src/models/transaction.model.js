const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
