const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');
const USER=mongoose.model("USER");


router.post('/phone',(req,res)=>{
    const {number,id}=req.body;
    USER.findById(id).then((detail)=>{
        detail.phone=number;
        detail.save().then(()=>{
            return res.status(200).json({message:"Phone no Saved",detail:detail})
        }).catch(()=>{
            return res.status(422).json({error:"Internal Server Error"})
        })
    }).catch(()=>{
        return res.status(422).json({error:"Internal Server Error"})
    })
})
router.post('/address',(req,res)=>{
    const {address,id}=req.body;
    USER.findById(id).then((detail)=>{
        detail.address=address;
        detail.save().then(()=>{
            return res.status(200).json({message:"Address Saved",detail:detail})
        }).catch(()=>{
            return res.status(422).json({error:"Internal Server Error"})
        })
    }).catch(()=>{
        return res.status(422).json({error:"Internal Server Error"})
    })
})

module.exports=router