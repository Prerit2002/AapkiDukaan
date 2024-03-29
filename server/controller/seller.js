var Seller = require('../model/seller')
var Products = require('../model/products')

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
        console.log(err)
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
        res.send({
            Website : data.WebsiteData,
            _id : data._id
        })
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
          _id : req.body.ProductId,
          Price : req.body.Price,
          Category : req.body.Category,
        }} }
       ).then((data)=>{
            console.log('Success')
            res.send(data)
       }).catch(e=>{
           console.log(e)
       })
}

exports.UpdateSetting = (req,res) =>{
    console.log(req.params.id, req.body)
    Seller.updateOne({_id : req.params.id},{WebsiteData : req.body.WebsiteData}).then((data)=>{
        console.log('Success')
        res.send(data)
    }).catch(e=>{
       console.log(e)
    })
    }

exports.ShowClient = (req,res)=>{
        Seller.find({}).then(data=>{
           res.send(data)
        })
     }
     
exports.GetProducts = (req,res) =>{
    Seller.findOne({_id : req.params.id}).then((data)=>{
        res.send(data.Products)
    }
    ).catch(e=>{
        res.status(500).send(e)
    })
}

  exports.GetProductsAll = async (req,res) =>{
    const SellerProds = async () => Seller.findOne({_id : req.params.id}).then((data)=>{
            return data.Products
        })
    const ELprod = async (v) => Products.findOne({_id : v._id}).then((data)=>{
        return data
    })
    let Arr = await SellerProds()
    let Arr2=[];
    for(let i=0; i<Arr.length; i++) {
        let v = await ELprod(Arr[i]._id)
        Arr[i]["Name"] = v.Name
        Arr[i]["Photo"] = v.Photo
        const returnedTarget = Object.assign(v,Arr[i]);
        Arr[i] = returnedTarget
        Arr2.push(returnedTarget)
    }
    res.send(Arr2)
  }
exports.GetProductsbyCategory = (req,res) =>{
    console.log(req.body)
    Seller.findById(req.params.id).then((data)=>{
         data = data.Products.filter((el)=>{
            return (el.Category===req.body.Category)
        })
        if(data.length>0) {
          res.send(data)
        }
        else {
            res.status(404).send('Not Found')   
        }
    }).catch(e=>{
        res.status(500).send(e)
    })
    }
    
  exports.Fprod = (req,res,next) => {
      Seller.find({'_id' : req.params.id},{'Products' : {$elemMatch : {'_id' : req.params.pid}}}).then(data=>{
          req.body["ProdData"] = data[0].Products[0]
          next()
      }).catch(e=>{ console.log(e)})

    }



exports.CreatePromoCode = (req, res) => {
    Seller.updateOne(
        { _id: req.params.id },
        { $addToSet: { PromoCode: {
          Code : req.body.Code,
          Discount : req.body.Discount,
          MaxDiscount : req.body.MaxDiscount,
        }} }
       ).then((data)=>{
            console.log('Success')
            res.send(data)
       })
  };

exports.GetPromoCode = (req,res) =>{
    Seller.findOne({_id : req.params.id}).then((data)=>{
        res.send(data.PromoCode)
    }
    ).catch(e=>{
        res.status(500).send(e)
    })
}

exports.CheckPromo = (req,res) =>{
    let Code=req.body.Code
    let Total=req.body.Total
    let MaxDiscount;
    let Discount;
    let TotalPrice;
    let DiscountPrice;
    Seller.find( {_id:req.params.id}, { PromoCode : { $elemMatch: {  Code : Code } } } ).then((data)=>{
     
        Discount=data[0].PromoCode[0].Discount
        MaxDiscount=data[0].PromoCode[0].MaxDiscount
        DiscountPrice=(Total*Discount)/100
        if (DiscountPrice<MaxDiscount) {
            TotalPrice=Total-DiscountPrice
        } else {
            TotalPrice=Total-MaxDiscount
        }

        res.send({
            NewTotal: TotalPrice,
            Discount:(Total-TotalPrice)
        })
    }
    ).catch(e=>{
        res.status(500).send(e)
    })
}
