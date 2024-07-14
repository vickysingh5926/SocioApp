import React, { useContext } from 'react'
import './signup.css'
import { useEffect,useState } from 'react'
import {Link,useNavigate} from "react-router-dom"
import {toast } from 'react-toastify';
import logo from '../../../public/picture/user.jpg'
import Context from '../../context.jsx';
const Signup = () => {
  const {Connecting_url,setloader}=useContext(Context)
  const [otp_show,setotp_show]=useState(false);
  const [otp_id,setotp_id]=useState("");
  const [otp,setotp]=useState("");
  const [name,setname]=useState("");
  const [username,setusername]=useState("");
  const [password,setpassword]=useState("");
  const [email,setemail]=useState("");
   const navigate=useNavigate();
  const notifyA=(val)=> toast.error(val)
  const notifyB=(val)=> toast.success(val)
    const emailregex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    useEffect(() => {
      const token = localStorage.getItem('jwt');
      if (token) {
        navigate('/profile');
      }
    }, []);
 function postdata(){
if(!emailregex.test(email)){
    notifyA("Invalid Email")
    return;
}
setloader(true)
  fetch(`${Connecting_url}/signup`,{
    method:"post",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      name:name,email:email,username:username,password:password
    })
  }).then((res)=>{
    setloader(false) 
    return res.json();
  }).then((val)=>{
    if(val.error){
      notifyA(val.error);
      setotp_show(false)
      return;
    }
    else{
      setname("");
      setemail("");
      setusername("");
      setpassword("");
      setotp_show(true)
      notifyB(val.message)
      setotp_id(val.otp_id)
      
    }
  }).catch((err)=>{
    notifyA("Error Occur")
    console.log(err)
  })
 }

 function postotp(){
  if(otp==""){
    notifyA("Fill Details");
    return;
  }
  setloader(true)
  fetch(`${Connecting_url}/otp`,{
    method:'post',
    headers:{
      "Content-Type":"Application/json",
    },
    body:JSON.stringify({
      otp:otp,
      otp_id:otp_id
    })
  }).then((val)=>{
    return val.json();
  }).then((res)=>{
    setloader(false)
    if(res.error){
      notifyA(res.error)
    }
    else{
      setotp("");
      setotp_id("");
      notifyB(res.message);
      navigate('/signin')
    }
  }).catch((err)=>{
    notifyA("Error occur");
  })
 }
  
  return (
    <div className='signup'>
    <div className='form-container'>
    <div className='form'>
    <img src={logo} className='signup-logo'/>
    <p className='loginpara'>Sign up to Create account </p>
   
   
   { otp_show?(<div><div>
   <input type='text' placeholder='Enter OTP' value={otp} onChange={(e)=>{setotp(e.target.value)}}/>
   </div>
   <input type='submit' id='submit-btn' value="Send OTP"  onClick={()=>{postotp()}}/></div>):( <div><div>
   <input type='email' name='email' id='email' placeholder='Email' value={email} onChange={(e)=>{setemail(e.target.value)}}/>
   </div>
   <div>
   <input type='text' name='name' id='name' placeholder='Full name' value={name} onChange={(e)=>{setname(e.target.value)}}/>
   </div>
   <div>
   <input type='text' name='username' id='username' placeholder='Username' value={username} onChange={(e)=>{setusername(e.target.value)}}/>
   </div>
   <div>
   <input type='password' name='password' id='password' placeholder='Password' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
   </div>
   <p className='loginpara' style={{fontSize:"14px",margin:"5px 0px"}}>
   By signing up,you agree to out terms,<br/>privacy policy and cookies policy.
   </p>
    <input type='submit' id='submit-btn' value="Sign Up"  onClick={()=>{postdata()}}/></div>)
   }
   
   
    </div>
    <div className='form2'>
    Already have an account?
    <Link to="/signin"><span >Sign In</span></Link>
        
    </div>
    </div>
    </div>
  )
}

export default Signup