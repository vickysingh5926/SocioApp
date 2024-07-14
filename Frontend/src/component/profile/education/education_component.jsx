import React, { useState,useContext } from 'react';
import './education_component.css';
import Context from '../../../context.jsx'
import { FaTrash } from 'react-icons/fa';
const Education_component = (props) => {
  const {Connecting_url,setloader}=useContext(Context)
 const {details,seteducation}=props;
 const userid=JSON.parse(localStorage.getItem('detail'))._id;
 
  function deleteeducation(){
    setloader(true)
  fetch(`${Connecting_url}/deleteeducation`,{
    method:'delete',
    headers:{
      'Content-type':"Application/json"
    },
    body:JSON.stringify({
      educationid:details._id,
      userid:userid
    })
  }).then((res)=>{
    return res.json();
  }).then((val)=>{
    localStorage.removeItem('detail')
    localStorage.setItem('detail',JSON.stringify(val.detail))
    seteducation(val.detail.education)
    setloader(false)
  }).catch((err)=>{
    setloader(false)
   
  })   
  }

  return (
    <div className='education_component'>
        <div className='education-details'>
        <button onClick={deleteeducation}><FaTrash /></button>
          <p><strong>Institute Name:</strong> {details.institute}</p>
          <p><strong>Degree:</strong> {details.degree}</p>
          <p><strong>Starting Date:</strong> {details.start}</p>
          <p><strong>Ending Date:</strong> {details.end}</p>
        </div>
    </div>
  );
};

export default Education_component;
