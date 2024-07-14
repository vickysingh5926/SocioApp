const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');
const USER=mongoose.model("USER");


router.post('/about',(req,res)=>{
    const {about,id}=req.body;
    USER.findById(id).then((detail)=>{
        detail.about=about;
        detail.save().then(()=>{
            return res.status(200).json({message:"About Added",detail:detail})
        }).catch(()=>{
            return res.status(422).json({error:"Internal Server Error"})
        })
    }).catch(()=>{
        return res.status(422).json({error:"Internal Server Error"})
    })
})

module.exports=router