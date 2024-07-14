import React ,{useState} from 'react'
import './education.css'
import Education_component from './education_component.jsx'
import Eduction_form from './education_form.jsx'
const Education = () => {
  const [iseducation,setiseduction]=useState(false)
  const [education_detail,seteducation_detail]=useState(JSON.parse(localStorage.getItem('detail')).education)
  function addeducation(){
   setiseduction(true)
  }
  return (
    <div className='education'>
      <h1>Education</h1>
    
      { 
  education_detail.map((e, k) => (
    <Education_component key={k} details={e} seteducation={seteducation_detail} />
  ))
}

         {
          iseducation?( <Eduction_form setdetail={seteducation_detail} isedu={setiseduction} />):(<div></div>)
         }
  
         <button className='add_education' onClick={addeducation}>Add Education</button>
    </div>
  )
}

export default Education