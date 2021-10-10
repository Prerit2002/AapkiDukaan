const Mongoose = require('mongoose')
const Pricing = require('./payment')

const personalDetails = new Mongoose.Schema({
    sellerName:{
        type:String,
        required:true
    },
    Address : {
        type:String,
        required:true
    },
    shopName:{
        type:String,
        required:true
    },
    domain: {
        type:String,
        required:true
    },
    gender: {
        type:String,
    }
})

const PromoCode = new Mongoose.Schema({
    Code:  {  
        type: String,
        required: true
    },
    ExpiryDate : {
        type: Date,
        required: true
    },
    Discount : {
        type: Number,
        required: true
    },
    MaxDiscount : {
        type: Number,
        required: true
    }
})

const Billing = new Mongoose.Schema({
    BillAmt:  {  
        type: String,
        required: true
    },
    StartDate : {
        type: Date,
        required: true
    },
    EndDate : {
        type: Date,
        required: true
    },
    PaymentStatus : {
        type: Boolean,
        required: true
    },
    DueDate : {
        type: Date,
        required: true
    }
})

const CustomerData = new Mongoose.Schema({
    Name:  {  
        type: String,
        required: true
    },
    Address:  {  
        type: String,
        required: true
    },
    Email : {
        type: String,
        required: true
    }
})

const Transaction = new Mongoose.Schema({
    ProdId:  {  
        type : Mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Products'
    },
    CustId : {
        type : Mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Customers'
    },
    Price : {
        type: Number,
        required: true
    },
    Type : {
        type: String,
        required: true
    },
    Date : {
        type: Date,
        required: true
    },
    Commission: {
        type :Number,
        required: true
    }
})

const Sales = new Mongoose.Schema({
    CustomerData : CustomerData,
    Transaction : Transaction
})

const Products = new Mongoose.Schema({
    ProductId : {
        type : Mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Products'
    },
    Variant : [{
        Price : {
            type : Number,
            required : true
        }
    }],
    CategoryId : {
        type : Mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Pricing'
    }
})

const sellerSchema = new Mongoose.Schema({
    PersonalDetails : [personalDetails],
    Bills: [Billing],
    Sales : [Sales],
    PromoCode : [PromoCode],
    Products: [Products]
},
    {
        collection : 'Sellers'
    }
)

const Seller = Mongoose.model('Seller', sellerSchema)

module.exports = Seller

