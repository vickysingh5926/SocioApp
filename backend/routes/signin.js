const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');
const USER=mongoose.model("USER");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const JWT_secret=require('../keys.js')




router.post('/signin',(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(422).json({error:"Please fill all feilds"})
    }
    
    USER.findOne({email:email}).then((detail)=>{
        if(!detail){
        return res.status(422).json({error:"Invalid Email"})
        }

        bcrypt.compare(password,detail.password).then((val)=>{
            if(!val){
                return res.status(422).json({error:"Invalid Password"})
            }
            else{
                const token=jwt.sign({_id:detail.id},JWT_secret)
               return res.status(200).json({token:token,detail:detail})
            }
        }).catch((err)=>{
            res.status(400).json({error:"Internal Server Error"})
        })
    })

})

module.exports=router