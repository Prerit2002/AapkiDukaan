const mongoose = require('mongoose')
const Payments = new Mongoose.Schema({
    TxId : {
        type: String,
        required: true
    },
    TxDate : {
        type : String,
        required: true
    },
    BillId : {
        type : String,
        required : true
    }
})
const Payment = new Mongoose.Schema({
    SellerId : [Payments]
})

const Pricing = mongoose.model("Pricing", Payment);

module.exports = Pricing;