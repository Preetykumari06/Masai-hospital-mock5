const UserModel=require("../Models/User.models")
const bcrypt=require("bcrypt")
require('dotenv').config();
const saltRounds=process.env.saltRounds

module.exports=async function registrationMiddleware(req,res,next){
    const {email, password}=req.body
    try{
        if(!email || !password) return res.send({msg: "Please Provide All Details, Keys Are Case Sensitive."})
        let isPresent=await UserModel.findOne({email})
    if(isPresent){
        return res.send({msg:'User alreday present, try login.'})
    }
    bcrypt.hash(password, saltRounds, (err,hash) => {
        if(err) return res.send({msg: 'An error occure, try again. '})
        req.body.password=hash;
    next()
    })
    } catch(error){
        res.status(400).send({err:error.message})
    }
}