const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const categoryRoutes = require("./Routes/Category");
const productRoutes = require("./Routes/Products");

const app = express();

const PORT = process.env.PORT | 5000;

app.use(bodyParser.json());
app.use(cors());

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

module.exports = app;
