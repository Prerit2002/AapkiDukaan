const mongoose = require('mongoose')

const personalDetails = new mongoose.Schema({
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

const Billing = new Mongoose.Schema({
   bill: [{
       billAmount: {
        type:Number,
        required:true
       },
       startDate: {
           type: Date,
           required:true
       },
       endDate: {
        type:Date,
        required:true
       },
       paymentStatus: {
        type:Boolean,
        required:true
       },
       dueDate:{
        type:Date,
        required:true
       }
   }]
})

const sellerSchema = new Mongoose.Schema({
    personalDetails = [personalDetails],
    bills: Billing,
    


})