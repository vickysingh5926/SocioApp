require('dotenv').config();
const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');
const USER=mongoose.model("USER");
const TEMP=mongoose.model("TEMP");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const nodemailer = require("nodemailer");
const JWT_secret=require('../keys.js')
const otp_sender=process.env.OTP_SENDER_EMAIL
const otp_sender_pass=process.env.OTP_SENDER_EMAIL_PASS
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, 
  auth: {
    user: otp_sender,
    pass: otp_sender_pass,
  },
});

async function main(email,otp) {
 
  const info = await transporter.sendMail({
    from: otp_sender, 
    to: email, 
    subject: "Email Verification", 
    html: `<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            color: #333333;
        }
        .content {
            padding: 20px 0;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            color: #555555;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #007BFF;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            font-size: 12px;
            color: #aaaaaa;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Your One-Time Password (OTP)</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Your OTP for Verifying your account is:</p>
            <p class="otp">${otp}</p>
            <p>Please use this OTP within the next 5 minutes to complete your authentication.</p>
        </div>
        <div class="footer">
            <p>If you did not request this OTP, please ignore this email or contact support.</p>
        </div>
    </div>
</body>
</html></b>`
  });

 
 
}

async function main2(email,username) {
 
  const info = await transporter.sendMail({
    from: otp_sender, 
    to: email, 
    subject: "Congratulation Sign Up Successfully", 
    html: `<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
      body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
      }
      .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .header {
          text-align: center;
          padding: 10px 0;
      }
      .header h1 {
          margin: 0;
          font-size: 24px;
          color: #333333;
      }
      .content {
          padding: 20px 0;
      }
      .content p {
          font-size: 16px;
          color: #555555;
      }
      .content .greeting {
          font-size: 18px;
          font-weight: bold;
          color: #333333;
      }
      .footer {
          text-align: center;
          padding: 10px 0;
          font-size: 12px;
          color: #aaaaaa;
      }
      .footer a {
          color: #007BFF;
          text-decoration: none;
      }
  </style>
</head>
<body>
  <div class="container">
      <div class="header">
          <h1>Welcome Back!</h1>
      </div>
      <div class="content">
          <p class="greeting">Hello ${username},</p>
          <p>We are excited to see you. You have successfully signed up  </p>
          <p>If you did not perform this action or suspect any suspicious activity, please contact our support team immediately.</p>
      </div>
      <div class="footer">
          <p>Thank you for being with us!</p>
          <p>If you have any questions, feel free to react out</p>
      </div>
  </div>
</body>
</html>
`
  });

 
 
}

function otp_generator(){
   const otp=Math.floor((Math.random()*10000)+1);
   return String(otp);
}

router.post('/signup',(req,res)=>{
      const {name,username,email,password}=req.body;
      if(!name || !email || !username || !password){
        return res.status(422).json({error:"Please fill all feilds"})
      }
      USER.findOne({email:email}).then((detail)=>{
        if(detail){
            return res.json({error:"User Already Registered"});
        }
        else{
              const otp=otp_generator();
               main(email,otp).then(()=>{
                const user=new TEMP({name,email,username,password,otp})
                user.save().then((user)=>{
                    res.status(200).json({message:"Enter OTP",otp_id:user._id});
               }).catch((err)=>{
                console.log(err)
                  res.status(404).json({error:"404 Error Occur"})
               })
               }).catch((err)=>{
                console.log(err)
                console.log(err)
               })
 
        }
      }) 
})
router.post('/otp',(req,res)=>{
  const {otp_id,otp}=req.body;
  if(!otp){
    return res.status(422).json({error:"Please Enter OTP"})
  }
  TEMP.findById(otp_id).then((detail)=>{
    if(!detail){
        return res.json({error:"User Not Found"});
    }
    else{
          if(detail.otp==otp){
            const {name,username,email,password}=detail;
            bcrypt.hash(password,5).then((hashpassword)=>{
                const user=new USER({email,name,username,password:hashpassword});
                user.save().then(()=>{
                     TEMP.deleteOne({_id:otp_id}).then(()=>{
                      main2(email,username).then(()=>{
                        return res.status(200).json({message:"Sign Up Successfully"})
                      }).catch(()=>{
                        return res.status(422).json({error:"Signup Failed"})
                      })
                      
                     })
                     .catch(()=>{
                      return res.json({error:"Internal Server Error"});
                     })
                })
            })
          }
          else{
            return res.json({error:"Incorrect OTP"});
          }

    }
  }).catch((err)=>{
    console.log("Error Occur")
  }) 
})


module.exports=router;
