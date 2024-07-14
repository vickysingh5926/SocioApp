import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RiCloseLine } from "react-icons/ri"
import './signout_modal.css'
const Modal = ({setsignoutmodalopen}) => {
  const navigate=useNavigate();
  return (
   
<div className="darkbg" onClick={()=>{setsignoutmodalopen(false)}}>
<div className="centered">
<div className='modal'>
<div className="modalheader">
<h5 className="heading">Confirm</h5>
</div>
<button className='closebtn' onClick={()=>{setsignoutmodalopen(false)}}>
<RiCloseLine></RiCloseLine>
</button>

<div className="modalcontent">
Are you want to Log out?
</div>
<div className="modalactions">
<div className="modalcontainer">
<div className="actioncontainer">
<button className="logoutbtn" onClick={()=>{
  setsignoutmodalopen(false)
  localStorage.clear();
  navigate('/signin')

}}>Log Out</button>
<button className="cancelbtn" onClick={()=>{setmodalopen(false)}}>Cancel</button>
</div>
</div>
</div>
</div>
</div>
</div>

   
   
  )
}

export default Modal