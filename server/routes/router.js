const express = require("express");
const route = express.Router();

const seller = require("../controller/seller");
const products = require("../controller/products");

route.post(
    "/api/createSeller",
    seller.createSeller
  );

  route.post(
    "/api/createProduct",
    products.createProduct
  );

  route.put(
    "/api/products/addVariant/:id",
    products.addVariant
  );

module.exports = route;
