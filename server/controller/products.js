var Products = require('../model/products')
const mongoose = require("mongoose");

exports.createProduct =   (req,res,next) => {
    try {
        if (!req.body){
            console.log("body dedo")
        }
    
        const product = new Products({
            Name: req.body.Name,
            Photo: req.body.Photo,
            _id: new mongoose.Types.ObjectId()
        })
    
        req.body["ProductId"] = product._id
        product.save().then(()=>{
            next()
        })
    
        
    }catch(err) {
        res.status(500).send(err)
    }
}

exports.ShowProducts = (req,res)=>{
    Products.find({}).then(data=>{
       
       res.send(data)
    })
 }