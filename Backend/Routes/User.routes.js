const express=require("express")
const {UserModel}=require("../Models/User.models");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

require('dotenv').config();


// const UserRouter=express.Router();



// UserRouter.post('/signup', async(req,res) => {
//     const {email, password}=req.body
//     try{
//         bcrypt.hash(password, 5, async(err,hash) => {
//             if(err) {
//                 return res.status(400).json({error:err.message})
//             } else {
//                 const newUser=new UserModel({email,password:hash})
//                 await newUser.save();
//         }
//         })
//         res.status(201).json({msg:'Registration Successfull.'})
//     } catch(error){
//        res.status(400).json({err:error.message})
//     }
// })

// UserRouter.post('/login',async (req,res) => {
//     const {email,password}=req.body
//     try{
//         const newUser= await UserModel.findOne({email})
//         if(user){
//             bcrypt.compare(password, newUser.password, (err,result) => {
//                 if(result){
//                     var token=jwt.sign({course:'backend'}, secretKey, {expiresIn:'2h'})
//                     res.status(200).json({msg:'Login Successfull.'})
//                 } else {
//                     res.status(400).json({err:error.message})
//                 }
//             })
//         }
//     } catch(error){
//         res.status(400).json({err:error.message})
//     }
// })


// module.exports={
//     UserRouter
// }




const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    try {

        const { Email, Password } = req.body;

        console.log(req.body);

        if (!Email || !Password) {
            return res.status(404).send({
                isError: true,
                msg: "Kindly provide all required details"
            })
        }

        const userPresent = await UserModel.findOne({ Email })

        if (userPresent) {
            return res.status(400).send({
                isError: true,
                msg: "This Email Id is Already Registed"
            })
        }

        const hashPass = await bcrypt.hashSync(Password, 10);

        const newuser = new UserModel({
            Email, Password: hashPass
        })

        await newuser.save()

        return res.status(201).send({
            isError: false,
            msg: "Your account has been successfully registered",
            data: newuser
        })

    } catch (error) {
        return res.status(500).send({
            isError: true,
            msg: error.message
        })
    }
})



userRouter.post('/login', async (req, res) => {
    try {

        const { Email, Password } = req.body;

        if (!Email || !Password) {
            return res.status(404).send({
                isError: true,
                msg: "Kindly provide all required details"
            })
        }

        const userPresent = await UserModel.findOne({ Email })

        if (!userPresent) {
            return res.status(404).send({
                isError: true,
                msg: "Invalid Credentials.(Email Not Found)"
            })
        }

        const ismatch = bcrypt.compareSync(Password, userPresent.Password);

        if (!ismatch) {
            return res.status(400).send({
                isError: true,
                msg: "Invalid Credentials ( Password not matched )"
            })
        }

        const token = jwt.sign({ UserId: userPresent._id }, process.env.SECREAT_KEY, { expiresIn: '24hr' })

        return res.status(201).send({
            isError: false,
            msg: "Login Successfull",
            token
        })

    } catch (error) {
        return res.status(500).send({
            isError: true,
            msg: error.message
        })
    }
})


module.exports = {
    userRouter
}