const express = require("express");
const route = express.Router();

const seller = require("../controller/seller");
const customer = require("../controller/customer");
const executive = require("../controller/executive");

route.post(
    "/api/createseller",
    seller.createSeller
  );

  route.post(
    "/api/createcustomer",
    customer.createCustomer
  );

  route.put(
    "/api/addAddress/:id",
    customer.addAddress
  );

  route.post(
    "/api/createexecutive",
    executive.createExecutive
  );
  route.put(
    "/api/addExecutive/:id",
    executive.addExecutive
  );


module.exports = route;
