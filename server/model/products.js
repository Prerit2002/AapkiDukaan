const mongoose = require('mongoose')
const Variant = new mongoose.Schema({
    Ratings:{
        CustId : {
            type:String,
            required: true
        },
        Stars : {
            type: Number,
            required: true
        }
    },
    RatingAvg : {
        type:Number,
        required:true
    },
    Variance:{
        type:String,
        required:true
    }
})

const ProductSchema = new mongoose.Schema({
    description:{
        type:String,
        
    },
    variantArray: [Variant]
})

ProductSchema.virtual('ProductId', {
    ref: 'Products',
    localField: '_id',
    foreignField: 'ProductId'
})



const Products = mongoose.model("Products", ProductSchema);

module.exports = Products;