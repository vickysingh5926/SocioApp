require('dotenv').config();
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const port=process.env.PORT;
const uri=process.env.DATABASE_URL;
app.use(cors())
app.use(express.json());
require('./model/user_detail.js')
require('./model/temp_details.js')
app.use(require('./routes/signup.js'))
app.use(require('./routes/signin.js'))
app.use(require('./routes/about.js'))
app.use(require('./routes/phone.js'))
app.use(require('./routes/education.js'))
app.use(require('./routes/profession.js'))
app.use(require('./routes/social_media.js'))


mongoose.connect(uri).then(()=>{
    console.log('Connected to Database')
}).catch(()=>{
    console.log('Not connected to Database')
})

app.listen(port,()=>{
    console.log('server is running')
})