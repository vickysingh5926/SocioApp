import React from 'react';
import { useContext } from 'react';
import './profession_component.css';
import Context from '../../../context.jsx'
import { FaTrash } from 'react-icons/fa';
const Profession_component = (prop) => {
  const {Connecting_url,setloader}=useContext(Context)
  const {proffdetail,setprofessiondetail,key}=prop;
  const userid=JSON.parse(localStorage.getItem('detail'))._id;
  
   function deleteprofession(){
    setloader(true)
   fetch(`${Connecting_url}/deleteprofession`,{
     method:'delete',
     headers:{
       'Content-type':"Application/json"
     },
     body:JSON.stringify({
       professionid:proffdetail._id,
       userid:userid
     })
   }).then((res)=>{
     return res.json();
   }).then((val)=>{
     localStorage.removeItem('detail')
     localStorage.setItem('detail',JSON.stringify(val.detail))
     setprofessiondetail(val.detail.profession)
     setloader(false)
   }).catch((err)=>{
    setloader(false)
     console.log(err)
   })   
   }
    
  return (
    <div className='profession_component'>
      <div className='profession-details'>
      <button onClick={deleteprofession}><FaTrash /></button>
        <p><strong>Company Name:</strong> {proffdetail.companyName}</p>
        <p><strong>Role:</strong> {proffdetail.role}</p>
        <p><strong>Job Type:</strong> {proffdetail.jobType}</p>
        <p><strong>Start Date:</strong> {proffdetail.startDate}</p>
        <p>
          <strong>End Date:</strong> {proffdetail.isOngoing ? 'Present' : proffdetail.endDate}
        </p>
        
      </div>
    </div>
  );
};

export default Profession_component;
