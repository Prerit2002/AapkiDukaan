var Seller = require('../model/seller')

exports.createSeller = async  (req,res) => {
    try {
        if (!req.body){
            console.log("body ")
        }

        console.log(req.body)

        const PersonalDetails={
            Name : req.body.Name,
            Email : req.body.Email,
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
            Color : req.body.ColorPalette,
            Title : req.body.Title,
            Sphone : req.body.Sphone,
            Semail : req.body.Semail
        }
        
        const seller = new Seller({
            PersonalDetails : PersonalDetails,
            WebsiteData : WebsiteData,
            AdminUserName : req.body.AdminUserName,
            Password : req.body.Password
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