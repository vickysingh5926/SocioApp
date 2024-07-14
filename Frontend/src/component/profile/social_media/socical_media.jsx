import React, { useState } from 'react';
import './social_media.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useContext } from 'react';
import Context from '../../../context';

const SocialMedia = () => {
  
  const {setsocial_media_modalopen,instagram,facebook,twitter,linkedin}=useContext(Context)
  
  return (
    <div className='social-media'>
      <h2>Social Media Profile</h2>
     
      <div className='social-icons'>
       { facebook && <a href={facebook} target='_blank' rel='noopener noreferrer' className='icon facebook'>
          <FaFacebookF />
        </a>}
        {twitter && <a href={twitter} target='_blank' rel='noopener noreferrer' className='icon twitter'>
          <FaTwitter  />
        </a>}
        {instagram  && <a href={instagram} target='_blank' rel='noopener noreferrer' className='icon instagram'>
          <FaInstagram  />
        </a>}
        {linkedin && <a href={linkedin} target='_blank' rel='noopener noreferrer' className='icon linkedin'>
          <FaLinkedinIn  />
        </a>}
      </div>
      <button onClick={()=>{setsocial_media_modalopen(true)}}>Add Link</button>
    </div>
  );
}

export default SocialMedia;
