const express = require("express");
const route = express.Router();

const seller = require("../controller/seller");
const products = require("../controller/products");
const customer = require("../controller/customer");
const executive = require("../controller/executive");
const AuthC = require("../middleware/authC");

route.get("/api/test",AuthC.AuthS,seller.Check);
route.post("/api/createProduct", products.createProduct);
route.put("/api/products/addVariant/:id", products.addVariant);
route.put("/api/addAddress/:id", customer.addAddress);
route.post("/api/createexecutive", executive.createExecutive);
route.put("/api/addExecutive/:id", executive.addExecutive);
route.post("/api/createUser/:Seller", AuthC.userRegister, seller.createSeller);
route.get("/api/loginUser/:role",AuthC.userLogin);

module.exports = route;
