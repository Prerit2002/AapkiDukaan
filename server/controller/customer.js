var Customer = require('../model/customer')

exports.createCustomer= async  (req,res) => {
    try {
        if (!req.body){
            console.log("Customer Body")
        }
    
        const customer = new Customer({
            Name : req.body.Name,
            Email: req.body.Email,
            PhoneNo : req.body.PhoneNo,
            Address : req.body.Address,
            PurchaseHistory : req.body.PurchaseHistory,
           
        })
    
        await customer.save()
        res.status(200).send(customer)

    }catch(err) {
        res.status(500).send(err)
    }
   
}

exports.addAddress = async (req,res) =>{
   Customer.updateOne(
    { _id: req.params.id },
    { $addToSet: { Address: req.body.Address } }
   ).then((data)=>{
        res.send(data)
   })
//    catch(e){

//    }
}