var Customer = require('../model/customer')



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