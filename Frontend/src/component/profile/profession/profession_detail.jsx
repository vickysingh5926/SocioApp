import React,{useState} from 'react'
import './profession_detail.css'
import Profession_component from './profession_component'
import Profession_form from './profession_form'
const Profession_detail = () => {
 
  const [isprofession,setisprofession]=useState(false)
  const [professiondetail,setprofession_detail]=useState(JSON.parse(localStorage.getItem('detail')).profession)
  function addprofession(){
   setisprofession(true)
  }
 
 
  return (
    <div className='profession_detail' >
        <h1>Experience</h1>
        {
          professiondetail.map((m,k)=>{
           return( <Profession_component proffdetail={m} key={k} setprofessiondetail={setprofession_detail}/>)
          })
        }
       {
        isprofession?(<Profession_form setprofessiondetail={setprofession_detail} ispro={setisprofession}/>):(<div></div>)
       }
       <button className='add_profession' onClick={addprofession}>Add Experience</button>
    </div>
  )
}

export default Profession_detail