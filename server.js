const express = require("express");
const app = express();
const connectDB = require('./server/database/connection');

const morgan = require('morgan');
const path = require('path');
const cors = require("cors");
const passport = require("passport");

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(passport.initialize());
connectDB();
app.use(express.urlencoded({ extended : true}))
app.use('/', require('./server/routes/router'))


app.listen(5000, () => {
  console.log("listening on port 5000");
});
