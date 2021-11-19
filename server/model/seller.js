const Mongoose = require("mongoose");
const personalDetails = new Mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Phone: {
    type: Number,
    required: true,
  },
  ShopName: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  AadharNo: {
    type: Number,
    required: true,
  },
});

const PromoCode = new Mongoose.Schema({
  Code: {
    type: String,
    required: true,
  },
  ExpiryDate: {
    type: Date,
  },
  Discount: {
    type: Number,
    required: true,
  },
  MaxDiscount: {
    type: Number,
    required: true,
  },
});



const Billing = new Mongoose.Schema({
  BillAmt: {
    type: String,
    required: true,
  },
  StartDate: {
    type: Date,
    required: true,
  },
  EndDate: {
    type: Date,
    required: true,
  },
  PaymentStatus: {
    type: Boolean,
    required: true,
  },
  DueDate: {
    type: Date,
    required: true,
  },
});


const WebsiteData = new Mongoose.Schema({
  Domain: {
    type: String,
    required: true,
  },
 
  PayTM: {
    type: Number,
    required: true,
  },
  GST: {
    type: Number,
    required: true,
  },
  Categories: [{
    type: String,
    required: true,
   } ],
   Color: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true
  },
  Sphone: {
    type: Number
   
  },
  Semail: {
    type: String
  
  }
 
 
});


const Sales = new Mongoose.Schema({
  ProdId: {
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Products",
  },
  CustId: {
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Customers",
  },
  Price: {
    type: Number,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  Commission: {
    type: Number,
    required: true,
  },
});

const Products = new Mongoose.Schema({
  ProductId: {
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Products",
  },
  Variant: [
    {
      Price: {
        type: Number,
        required: true,
      },
    },
  ],
  CategoryId: {
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Pricing",
  },
});

const sellerSchema = new Mongoose.Schema(
  {
    PersonalDetails: personalDetails,
    Bills: [Billing],
    Sales: [Sales],
    PromoCode: [PromoCode],
    Products: [Products],
    WebsiteData: WebsiteData,
    Username: {
     type: String,
     required: true,
    },
    Password: {
       type: String,
        required: true,
    },
    Email: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Sellers",
  }
);

const Seller = Mongoose.model("Seller", sellerSchema);

module.exports = Seller;
