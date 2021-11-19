const express = require("express");
const route = express.Router();

const seller = require("../controller/seller");
const products = require("../controller/products");
const customer = require("../controller/customer");
const executive = require("../controller/executive");
const AuthC = require("../middleware/authC");

route.get("/api/test",AuthC.AuthS,seller.Check);
route.post("/api/createProduct", products.createProduct);
// route.put("/api/products/addVariant/:id", products.addVariant);
// route.put("/api/addAddress/:id", customer.addAddress);
// route.post("/api/createexecutive", executive.createExecutive);
// route.put("/api/addExecutive/:id", executive.addExecutive);
route.post("/api/create/Seller", AuthC.userRegister, seller.createSeller);
route.post("/api/create/Customer", AuthC.userRegister, customer.createCustomer);
route.get("/api/loginUser/:role",AuthC.userLogin);
route.get("/api/test",AuthC.AuthC,seller.Check);
route.get("/api/test2",AuthC.AuthS,customer.Check);
module.exports = route;
