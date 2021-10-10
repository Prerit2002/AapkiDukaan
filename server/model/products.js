const mongoose = require('mongoose')
const Variant = new mongoose.Schema({
    Ratings:{
        SellerId : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : 'Seller'
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
    Name:{
        type:String,
        
    },
    Description:{
        type:String,
        
    },
    Variants: [Variant]
},
{
    collection : 'Products'
})

// ProductSchema.virtual('ProductId', {
//     ref: 'Products',
//     localField: '_id',
//     foreignField: 'ProductId'
// })



const Products = mongoose.model("Products", ProductSchema);

module.exports = Products;