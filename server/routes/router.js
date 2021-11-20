const express = require("express");
const route = express.Router();

const seller = require("../controller/seller");
const products = require("../controller/products");
const customer = require("../controller/customer");
const executive = require("../controller/executive");
const Auth = require("../middleware/Auth");

route.get("/api/test",Auth.AuthS,seller.Check);
route.put("/api/findSellerbyDomain",seller.findSellerbyDomain);
route.post("/api/createProduct", products.createProduct);
// route.put("/api/products/addVariant/:id", products.addVariant);
// route.put("/api/addAddress/:id", customer.addAddress);
// route.post("/api/createexecutive", executive.createExecutive);
// route.put("/api/addExecutive/:id", executive.addExecutive);
route.post("/api/create/Seller", Auth.userRegister, seller.createSeller);
route.post("/api/create/Customer", Auth.userRegister, customer.createCustomer);
route.get("/api/loginUser/:role",Auth.userLogin);
route.get("/api/test",Auth.AuthC,seller.Check);
route.get("/api/test2",Auth.AuthS,customer.Check);
route.put("/api/createProduct",products.createProduct,seller.AddProducts);
route.put("/api/addProduct",seller.AddProducts);
route.put("/api/updateWebsite/:id",seller.UpdateSetting);
route.get("/api/showCustomer",customer.ShowCustomer);
route.get("/api/showClient",seller.ShowClient);
route.get("/api/showProduct",products.ShowProducts);
module.exports = route;
