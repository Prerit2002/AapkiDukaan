const express = require("express");
const route = express.Router();

const seller = require("../controller/seller");

route.post(
    "/api/createseller",
    seller.createSeller
  );


module.exports = route;
