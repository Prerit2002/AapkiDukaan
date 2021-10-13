var Products = require('../model/products')

exports.createProduct = async  (req,res) => {
    try {
        if (!req.body){
            console.log("body dedo")
        }
        const product = new Products({
            Name: req.body.Name,
            Description : req.body.Description,
            Variants : req.body.Variants
        })
        
        await product.save()
        res.status(200).send(product)

    }catch(err) {
        res.status(500).send(err)
    }
}

exports.addVariant = async (req,res) =>{
    Products.updateOne(
     { _id: req.params.id },
     { $addToSet: { Variants: req.body.Variant } }
    ).then((data)=>{
         res.send(data)
    })
}