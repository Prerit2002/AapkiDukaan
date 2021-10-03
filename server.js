const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose
  .connect( "mongodb+srv://admin:BM81WnYHfJGKm2RU@cluster0.wdu17.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" ,
    {
      useNewUrlParser: true, // we do this to avoid the depracation warning
      useUnifiedTopology: true, //The useUnifiedTopology option removes support for several connection options that are no longer relevant with the new engine:
      
    }
  )
  .then(() => {
    console.log("db connected");
  })
  .catch((e) => {
    console.log(e);
  });


app.listen(4000, () => {
  console.log("listening on port 4000");
});


