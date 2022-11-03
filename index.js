const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connection = mongoose.connect(process.env.MONGO_URL);

const app = express();
app.use(cors());
// const product = require("./api/product");
const UserModel = require("./model/User")

app.use(express.json({ extended: false }));


// app.use("/api/product", product);
app.get("/",(req, res)=>{

    res.send("Backend Working")
})

// Signup Route

app.post("/signup", async(req,res)=>{
    const user = await new UserModel(req.body);
    user.save((err,success)=>{
        if(err){
            res.status(500).send({message: "error occurred"})
        }
        return res.status(201).send({message: "Signed up successfully", token : 12345})
    });
});

// Login Router

app.post("/login", async(req,res)=>{
    // console.log(req.body);
    const checkUser = await UserModel.findOne(req.body).lean();
    if(checkUser){
        let payload = {
            ...checkUser,
            token : 12345
        }
        console.log(checkUser)
        res.send(payload);
    }
    else{
        res.send({message:"Wrong Credentials"})
    }
});





const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    try {
       await connection;
       console.log("connection to db");
     } catch {
       console.log("failled");
     }
     console.log("server starting");
   });