const mongoose = require("mongoose");

const StockSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    count: {
      type: Number,
      default: 1,
    },
    amount: {
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

const Stock = mongoose.model("Stock", StockSchema);

module.exports = Stock;
