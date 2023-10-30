const express=require("express")
const {UserModel}=require("../Models/User.models");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const secretKey=process.env.secretKey
require('dotenv').config();


const UserRouter=express.Router();



UserRouter.post('/signup', async(req,res) => {
    const {email, password}=req.body
    try{
        bcrypt.hash(password, 5, async(err,hash) => {
            if(err) {
                return res.status(400).json({error:err.message})
            } else {
                const newUser=new UserModel({email,password:hash})
                await newUser.save();
        }
        })
        res.status(201).json({msg:'Registration Successfull.'})
    } catch(error){
       res.status(400).json({err:error.message})
    }
})

UserRouter.post('/login',async (req,res) => {
    const {email,password}=req.body
    try{
        const newUser= await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, newUser.password, (err,result) => {
                if(result){
                    var token=jwt.sign({course:'backend'}, secretKey, {expiresIn:'2h'})
                    res.status(200).json({msg:'Login Successfull.'})
                } else {
                    res.status(400).json({err:error.message})
                }
            })
        }
    } catch(error){
        res.status(400).json({err:error.message})
    }
})


module.exports={
    UserRouter
}