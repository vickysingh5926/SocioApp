import React from 'react';
import { useState,useContext} from 'react';
import {toast} from 'react-toastify'
import './profile.css';
import Context from '../../context.jsx';
import ContactInformation from './contact/contact';
import Education from './education/education';
import Profession_detail from './profession/profession_detail';
import Social_media from './social_media/socical_media.jsx';
import logo from '../../../public/picture/profile.png'

const Profile = () => {
  const notifyA=(val)=> toast.warn(val)
  const {Connecting_url,setloader,setsignoutmodalopen}=useContext(Context)
  const profileData=JSON.parse(localStorage.getItem('detail'))
  const [about,setabout]=useState(profileData.about);
  const [about_val,setabout_val]=useState("")
 



function addabout(about){
  
  if(about==""){
    notifyA('Empty Feild')
    return;
  }
  setloader(true)
   fetch(`${Connecting_url}/about`,{
    method:"post",
    headers:{
      "Content-Type":"Application/json"
    },
    body:JSON.stringify({
      about:about,
      id:profileData._id
    })
   }).then((res)=>{
    return res.json();
   })
   .then((val)=>{
   
localStorage.removeItem('detail');
localStorage.setItem('detail', JSON.stringify(val.detail));
setloader(false)
    setabout(val.detail.about)
    setabout_val("")
  
   }).catch((err)=>{
    setloader(false)
    
   })
}
 function editabout(){
  setabout_val(about)
   setabout("")
  }

function signout(){
  setsignoutmodalopen(true)
}
  return (
    <div className="profile-div">
      <div className='profile'>
      <div className="profile-container">
        <div><img src={logo} alt="Profile" className="profile-picture"  />
      <h1 className="profile-username" >{profileData.username}</h1>
         
        </div>
       
      <div className="profile-details">
        <h1 className="profile-fullname">{profileData.name}</h1>
        <p className="profile-email">{profileData.email}</p>
      </div>
      {
    
  }  
    </div>

    <div className="signout-div"><button onClick={()=>{signout()}}>Logout</button></div>
      </div>
 
        <hr />

    <div className="about-div">
        <h2>About</h2>
       
{
  about? (
    <div>
      <p className='about'>{about}</p> 
      <button onClick={()=>{editabout()}} >Edit</button>
    </div>
  ) : (
    <div>
      <textarea
        placeholder='Add About Yourself'
        value={about_val}
        onChange={(e) => { setabout_val(e.target.value) }}
      ></textarea>
      <button onClick={() => addabout(about_val)}>Add</button>
    </div>
  )
}
<br />
<Education/>
<Profession_detail/>
<ContactInformation data={profileData}/>
<Social_media  />
      </div>

    
    </div>
    
  );
}

export default Profile;
