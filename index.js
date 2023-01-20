const express = require("express");
var cors = require("cors");
const app = express();
const InStockRoutes = require('./routes/InStock.js');

//configuration
require('dotenv').config();
const PORT = process.env.PORT || 8080;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/", InStockRoutes);

app.listen(8080, function() {
    console.log("Server is running on 8080");
})