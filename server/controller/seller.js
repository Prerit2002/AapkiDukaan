var Seller = require('../model/seller')


// exports.createBranch = (req,res)=>{
//     // validate request
//     if(!req.body){
//         res.status(400).send({ message : "Content can not be emtpy!"});
//         return;
//     }
//     // new Branch
//     const Branch = new Branchs({
//         Name : req.body.Name,
//         Payments: req.body.Payments,
//         Total : req.body.Total
//     })
//     // save Branch in the database
//     Branch
//         .save(Branch)
//         .then(data => {
//             //res.send(data)
//             res.status(200).send({ message : "Done"});
//         })
//         .catch(err =>{
//             res.status(500).send({
//                 message : err.message || "Some error occurred while creating a create operation"
//             });
//         });
// }


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