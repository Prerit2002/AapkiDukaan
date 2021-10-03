const express = require("express");
const app = express();
const connectDB = require('./server/database/connection');


connectDB();

app.use(express.urlencoded({ extended : true}))


app.listen(5000, () => {
  console.log("listening on port 5000");
});
