import React, { useState,useContext } from 'react';
import './profession_form.css';
import {toast} from 'react-toastify'
import Context from '../../../context.jsx'
const Profession_form = ({ispro,setprofessiondetail}) => {
  const {Connecting_url,setloader}=useContext(Context)
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [jobType, setJobType] = useState(''); 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isOngoing, setIsOngoing] = useState(false);
  const userid=JSON.parse(localStorage.getItem('detail'))._id;
  const jobTypes = ['Full-time','Part-time','Contract','Freelance','Internship','Remote','Other'];
  const notifyA=(val)=> toast.warn(val)
  const handleOngoingChange = (e) => {
    setIsOngoing(e.target.checked);
    if (e.target.checked) {
      setEndDate('');
    }
  };


  function profession_send(){
    if(companyName=="" || role==""||startDate==""||jobType==""){
      notifyA('Empty Feild')
      return;
    }
    setloader(true)
    fetch(`${Connecting_url}/profession`,{
      method:'post',
      headers:{
        'Content-Type':"Application/json"
      },
      body:JSON.stringify({
        id:userid,
        companyName:companyName,
        jobType:jobType,
        role:role,
        startDate:startDate,
        endDate:endDate,
        isOngoing:isOngoing
      })
    }).then((res)=>{
      return res.json();
    }).then((val)=>{
      localStorage.removeItem('detail')
      localStorage.setItem('detail',JSON.stringify(val.detail))
      setprofessiondetail(val.detail.profession)
      ispro(false)
      setCompanyName("")
      setRole("")
      setEndDate("")
      setStartDate("")
      setIsOngoing(false)
      setloader(false)
    }).catch((err)=>{
      setloader(false)
    })
  }

  return (
    <div className='profession_form'>
      <h2>Enter Profession Details</h2>
      
        <div className='form-group1'>
          <label htmlFor='companyName'>Company Name:</label>
          <input
            type='text'
            id='companyName'
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            placeholder='Enter Company Name'
          />
        </div>
        <div className='form-group1'>
          <label htmlFor='role'>Role:</label>
          <input
            type='text'
            id='role'
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
             placeholder='Enter Your Role'
          />
        </div>
        <div className='form-group1'>
          <label htmlFor='jobType'>Job Type:</label>
          <select
            id='jobType'
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            required
          >
            <option value='' disabled>Select job type</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
       
        <div className='form-group1'>
          <label htmlFor='startDate'>Start Date:</label>
          <input
            type='date'
            id='startDate'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className='form-group1'>
          <label htmlFor='endDate'>End Date:</label>
          <input
            type='date'
            id='endDate'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={isOngoing} 
          />
        </div>
        <div className='form-group2'>
        <label htmlFor='isOngoing' className='checkbox-label'>Currently Ongoing:</label>
          <input
            type='checkbox'
            id='isgoing'
            checked={isOngoing}
            onChange={handleOngoingChange}
          />
         
        </div>
       
        <button type='submit' onClick={profession_send}>Save</button>
      
    </div>
  );
};

export default Profession_form;
