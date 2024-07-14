import React, { useState,useContext } from 'react';
import './social_media_modal.css';
import Context from '../../context';
const Social_media_modal = () => {
  const [platform, setPlatform] = useState('');
  const [link, setLink] = useState('');
  const {setsocial_media_modalopen,setloader,Connecting_url,setinstagram,setfacebook,settwitter,setlinkedin}=useContext(Context)
  const user_details=JSON.parse(localStorage.getItem('detail'))._id
  const handleClose = () => {
    setsocial_media_modalopen(false)
  };

  function handleSave(){
    // if(link==""||platform==""){
    //     return;
    // }
    console.log(platform)
    setloader(true)
    fetch(`${Connecting_url}/sociallink`,{
        method:"post",
        headers:{
            "Content-Type":"Application/json"
        },
        body:JSON.stringify({
            id:user_details,
            link:link,
            platform:platform
        })
    }).then((res)=>{
        return res.json();
    }).then((val)=>{
        localStorage.removeItem('detail')
        localStorage.setItem('detail',JSON.stringify(val.detail))
        setinstagram(val.detail.social_link.instagram)
        settwitter(val.detail.social_link.twitter)
        setfacebook(val.detail.social_link.facebook)
        setlinkedin(val.detail.social_link.linkedin)
        setloader(false)
    }).catch((err)=>{
        setloader(false)
        console.log('error')
    })
  }

  return (
    <div className="social-media-modal">
      <div className="social-media-modal-content">
        <span className="close-icon" onClick={handleClose}>&times;</span>
        <label>
          Select Platform:
          <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
            <option value="">--Select--</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="twitter">Twitter</option>
            <option value="facebook">Facebook</option>
          </select>
        </label>
        <label>
          Link:
          <input 
            type="text" 
            value={link} 
            onChange={(e) => setLink(e.target.value)} 
            placeholder="Enter your link" 
          />
        </label>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default Social_media_modal;
