var Seller = require('../model/seller')

exports.createSeller = async  (req,res) => {
    try {
        if (!req.body){
            console.log("body ")
        }

        console.log(req.body)

        const PersonalDetails={
            Name : req.body.Name,
            Phone : req.body.Phone,
            ShopName : req.body.ShopName,
            Address : req.body.Address,
            AadharNo : req.body.AadharNo
        }

        const WebsiteData={
            Domain : req.body.Domain,
            PayTM : req.body.PayTM,
            GST : req.body.GST,
            Categories : req.body.Categories,
            Color : req.body.Color,
            Title : req.body.Title,
            Sphone : req.body.Sphone,
            Semail : req.body.Semail
        }
        
        const seller = new Seller({
            PersonalDetails : PersonalDetails,
            WebsiteData : WebsiteData,
            Username : req.body.Username,
            Password : req.body.Password,
            Email : req.body.Email,

        })
        console.log(seller)
        await seller.save()
        res.status(200).send(seller)

    }catch(err) {
        res.status(500).send(err)
    }
}
exports.Check = async(req,res) => {
    res.send({message : "All Good"})
}


exports.findSellerbyDomain = (req,res) => {
    console.log(req.body)
    Seller.findOne({'WebsiteData.Domain' : req.body.Domain})
    .then((data)=>{
        res.send(data.WebsiteData)
    })
    .catch((e)=>{
        res.status(404).send({error:"Seller Not Found"})
    })
}

exports.AddProducts = (req,res)=>{
    console.log(req.body)
    Seller.updateOne(
        { _id: req.body.id },
        { $addToSet: { Products: {
          ProductId : req.body.ProductId,
          Price : req.body.Price,
          CategoryId : req.body.CategoryId,
        }} }
       ).then((data)=>{
            console.log('Success')
            res.send(data)
       }).catch(e=>{
           console.log(e)
       })
}