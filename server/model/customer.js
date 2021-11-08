const Mongoose = require('mongoose')
const Address = new Mongoose.Schema({
    Hno : {
        type:Number,
        required:true
    },
    Street : {
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    Landmark:{
        type:String,
        required:true
    },
    Pincode:{
        type:Number,
        required:true
    }
})
const PurchaseHistory = new Mongoose.Schema({
    SellerId : {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Seller",
    },
    Price : {
        type:Number,
        required:true
    },
    ProductId:{
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Products",
    },
    AddressId:{
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
    },
    Status:{
        type:Boolean,
        required:true
    }
})
const CustomerSchema = new Mongoose.Schema({
    Address: [Address],
    Name : {
        type: String,
        required: true
    },
    Username : {
        type: String,
        required: true
    },
    Password : {
        type: String,
        required: true
    },
  
    Email : {
        type: String,
        required: true
    },
    PhoneNo : {
        type: Number,
        required: true
    },
    PurchaseHistory : [PurchaseHistory]
}, 
{
    collection : 'Customers'
})

const Customers = Mongoose.model("Customers", CustomerSchema);

module.exports = Customers;