const express=require("express");
const CORS=require('cors');
const {connection}=require("./Backend/Config/db");
require('dotenv').config();

const app=express();

app.use(express.json());
app.use(CORS());


app.get('/', (req,res) => {
    res.send({
        msg: 'Welcome To Masai Hospital App.',
        Student_name: 'Preety Kumari',
        Student_code: 'fw24_759'
    })
//   res.send("Welcome")
});



app.listen(process.env.PORT, async() => {
    try{
        await connection;
        console.log('Connected to the DB.')
    } catch(error){
       console.log(error);
       console.log('Somthing went to wrong while connected to the DB.')
    }
    console.log(`Server is running on ${process.env.PORT}`)
    // console.log("Server is running on 3000")
})