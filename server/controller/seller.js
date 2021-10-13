var Seller = require('../model/seller')

exports.createSeller = async  (req,res) => {
    try {
        if (!req.body){
            console.log("body dedo")
        }
        const seller = new Seller({
            PersonalDetails : req.body.PersonalDetails,
            Bills : req.body.Bills,
            Sales : req.body.Sales,
            PromoCode: req.body.PromoCode,
            Products : req.body.Products,
        })
    
        await seller.save()
        res.status(200).send(seller)

    }catch(err) {
        res.status(500).send(err)
    }
}