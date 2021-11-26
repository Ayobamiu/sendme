//import
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const stockRoute = require("./routers/stock.route");
const transactionRoute = require("./routers/transaction.route");
const authRoute = require("./routers/auth.route");
require("./db/mongoose");
//create express App

const app = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/auth", authRoute);
app.use("/transaction", transactionRoute);
app.use("/stock", stockRoute);

module.exports = app;
