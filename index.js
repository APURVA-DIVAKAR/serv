
const express = require('express')
require('dotenv').config()
const UserModal = require('./model/User')
const BMIModal = require('./model/Bmi')
const mongoose = require('mongoose')
const argon2 = require('argon2')
const cors = require("cors")
const app = express()
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/',(req,res)=>{
  res.send({message: 'Hey its Working'})
})

// SignUp Route
app.post('/register',async(req,res)=>{
    const {name,password,email} = req.body;
    const hash = await argon2.hash(password);
    if(name && password && email){
        const user = new UserModal({name,hash,email})
        await user.save();
        res.status(201).send({
            message:"User Created Succesfully!"
        })
    }
    else{
        res.status(400).send({
            message:"Bad Request - All fileds are required",

        })
    }
})

// Login Route

app.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    const user = await UserModal.findOne({email: email, password: password})
    // console.log(user)
    const verification = await argon2.verify(user.hash, password)
    console.log(verification)
    if(verification){
        let payload = {
            user,
            token : 12345
        }
        // console.log(checkuser)
        res.send(payload);
        
    }
    else{
        res.status(401).send("Unauthorized")
    }
})

// BmiCalculator

// app.post('/calculateBMI',async(req,res)=>{
//     const userId = req.session.user_id
//     res.send(userId)
//     const {ht,wt} = req.body;
//     ht = ht.split("'").map(Number);
//     ht = (ht[0]*12.00000)+ht[1];
//     ht = ht/39.37008
//     let bmi = ht/wt;
//     // let res;
//     // if(bmi<18.5){
//     //    res ="Under Weight" 
//     // }
//     // else if(bmi>=18.5 && bmi<=24.9){
//     //     res ="Normal Weight" 
//     // }
//     // else if(bmi>=25 && bmi<=29.9){
//     //     res ="Over Weight" 
//     // }
//     // else if(bmi>=30 && bmi<=34.9){
//     //     res ="Obesity" 
//     // }
//     // else{
//     //     res ="Extrem Obesity" 
//     // }

//     // const bres = new UserModal({Bmi:bmi,Result:res,user:userId})
//     // await bres.save();
//     // res.status(201).send("User Result saved Succesfully!",bres)
    

// })

mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(8080,()=>{ console.log('listening on 8080')})
})