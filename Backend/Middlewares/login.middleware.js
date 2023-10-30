const UserModel=require("../Models/User.models")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require('dotenv').config();
const secretKey=process.env.secretKey


module.exports=async function loginmiddleware(req,res,next){
    const {email,password}=req.body
    try{
        if(!email || !password) return res.send({msg: "Please Provide All Details, Keys Are Case Sensitive."})
        let isPresent=await UserModel.findOne({email})
    if(!isPresent){
        return res.send({msg:'User not exist.'})
    }

    bcrypt.compare(password, isPresent.password, (err,result) => {
        if(!result) return res.send({msg: "Invalid Credentials."})
        isPresent.password=null;
    let token=jwt.sign({userData: isPresent}, secretKey, {expiresIn:'2h'})
    req.body.token=token;
    next();
    })
    } catch(error){
        res.status(400).send({err:error.message})
    }
}