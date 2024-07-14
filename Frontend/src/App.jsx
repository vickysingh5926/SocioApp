import './App.css';
import Signup from './component/signup/signup.jsx';
import Profile from './component/profile/profile.jsx';
import Signin from './component/signin/signin.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from 'react-loader-spinner';
import { useEffect, useState } from 'react';
import Context from './context.jsx';
import Social_media_modal from './component/modal/social_media_modal.jsx';
import Signout_modal from './component/modal/signout_modal.jsx';

function App() {
  const [loader, setloader] = useState(false);
  const [user_links,setuser_links] =useState( localStorage.getItem('detail') ? JSON.parse(localStorage.getItem('detail')).social_link : null);

  const Connecting_url = "https://full-stack-intern-project.onrender.com"
 

  const [instagram, setinstagram] = useState(user_links ? user_links.instagram : "");
  const [facebook, setfacebook] = useState(user_links ? user_links.facebook : "");
  const [twitter, settwitter] = useState(user_links ? user_links.twitter : "");
  const [linkedin, setlinkedin] = useState(user_links ? user_links.linkedin : "");
  const [signoutmodalopen, setsignoutmodalopen] = useState(false);
  const [social_media_modalopen, setsocial_media_modalopen] = useState(false);

  return (
    <BrowserRouter>
      <Context.Provider value={{ setloader, loader, Connecting_url, setsignoutmodalopen, setsocial_media_modalopen, instagram, setinstagram, setfacebook, facebook, twitter, settwitter, setlinkedin, linkedin,setuser_links }}>
        <div className='app'>
          {loader && (
            <div className='loader-overlay'>
              <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="black"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
          <Routes>
            <Route path='/' element={<Signup />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/signin' element={<Signin />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
          </Routes>
          {signoutmodalopen && <Signout_modal setsignoutmodalopen={setsignoutmodalopen} />}
          {social_media_modalopen && <Social_media_modal setsocial_media_modalopen={setsocial_media_modalopen} />}
          <ToastContainer theme="dark" />
        </div>
      </Context.Provider>
    </BrowserRouter>
  );
}

export default App;
