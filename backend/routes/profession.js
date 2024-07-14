const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');
const USER=mongoose.model("USER");

router.post('/profession',(req,res)=>{
    const {companyName,jobType,role,startDate,endDate,id,isOngoing}=req.body;
    const profession_details={
        companyName:companyName,
        jobType:jobType,
        role:role,
        startDate:startDate,
         endDate:endDate,
        isOngoing:isOngoing
    }
    USER.findById(id).then((detail)=>{
        detail.profession.push(profession_details);
        detail.save().then(()=>{
            return res.status(200).json({message:"Experience Added",detail:detail})
        }).catch(()=>{
            return res.status(422).json({error:"Internal Server Error"})
        })
    }).catch(()=>{
        return res.status(422).json({error:"Internal Server Error"})
    })
})

router.delete('/deleteprofession',(req,res)=>{
    const {userid,professionid}=req.body;
    USER.findById(userid).then((detail)=>{
        detail.profession = detail.profession.filter(pro => pro._id.toString()  !== professionid);
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