import React, { useState,useContext } from 'react';
import './education_form.css'
import { toast } from 'react-toastify';
import Context from '../../../context.jsx'
const Eduction_form = ({ setdetail, isedu }) => {
  const {setloader,Connecting_url}=useContext(Context)
  const [institute, setInstituteName] = useState('');
  const [degree, setDegree] = useState('');
  const [start, setStartDate] = useState('');
  const [end, setEndDate] = useState('');
  const notifyA=(val)=> toast.warn(val)
   const userid=JSON.parse(localStorage.getItem('detail'))._id;
  function education_send(){
    if(institute=="" || degree==""||start==""||end==""){
      notifyA('Empty Feild')
      return;
    }
    setloader(true)
    fetch(`${Connecting_url}/education`,{
      method:'post',
      headers:{
        'Content-Type':"Application/json"
      },
      body:JSON.stringify({
        id:userid,
        institute:institute,
        degree:degree,
        start:start,
        end:end
      })
    }).then((res)=>{
      return res.json();
    }).then((val)=>{
      localStorage.removeItem('detail')
      localStorage.setItem('detail',JSON.stringify(val.detail))
      setdetail(val.detail.education)
      isedu(false)
      setInstituteName("")
      setDegree("")
      setEndDate("")
      setStartDate("")
       setloader(false)
    }).catch((err)=>{
      setloader(false)
      console.log("err")
    })
  }

  return (
    <div className='education_component2'>
        <div>
          <h2>Enter Education Details</h2>
        <div className='form-group'>
          <label htmlFor='institute'>Institute Name:</label>
          <input
            type='text'
            id='institute'
            placeholder='Enter Insitute Name'
            value={institute}
            onChange={(e) => setInstituteName(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='degree'>Degree:</label>
          <input
            type='text'
            placeholder='Enter Degree'
            id='degree'
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='start-date'>Starting Date:</label>
          <input
            type='date'
            id='start-date'
            value={start}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='end-date'>Ending Date:</label>
          <input
            type='date'
            id='end-date'
            value={end}
            onChange={(e) => setEndDate(e.target.value)}
          />

        </div>
      <div className="component_save">
        <button onClick={education_send}>Save</button>
      </div>
      
      </div>
    </div>
  )
}

export default Eduction_form