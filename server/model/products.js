const mongoose = require("mongoose");
const Variant = new mongoose.Schema({
  Ratings: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    Stars: {
      type: Number,
    },
  },
  RatingAvg: {
    type: Number,
  },
  Variance: {
    type: String,
    required: true,
  },
});

const ProductSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
    },
    Description: {
      type: String,
    },
    Photo: {
      type: String,
    },
    Variants: [Variant],
  },
  {
    collection: "Products",
  }
);

const Products = mongoose.model("Products", ProductSchema);

module.exports = Products;
