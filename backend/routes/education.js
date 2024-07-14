const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');
const USER=mongoose.model("USER");


router.post('/education',(req,res)=>{
    const {institute,degree,start,end,id}=req.body;
    const education_details={
        institute:institute,
        degree:degree,
        start:start,
        end:end
    }
    USER.findById(id).then((detail)=>{
        detail.education.push(education_details);
        detail.save().then(()=>{
            return res.status(200).json({message:"Education Added",detail:detail})
        }).catch(()=>{
            return res.status(422).json({error:"Internal Server Error"})
        })
    }).catch(()=>{
        return res.status(422).json({error:"Internal Server Error"})
    })
})

router.delete('/deleteeducation',(req,res)=>{
    const {userid,educationid}=req.body;
    USER.findById(userid).then((detail)=>{
        detail.education = detail.education.filter(edu => edu._id.toString()  !== educationid);
        detail.save().then(()=>{
            return res.status(200).json({message:"Deleted Successfully",detail:detail})
        }).catch(()=>{
            return res.status(422).json({error:"Internal Server Error"})
        })
    }).catch(()=>{
        return res.status(422).json({error:"Internal Server Error"})
    })
})


module.exports=router