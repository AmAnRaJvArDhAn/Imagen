import React, { useEffect } from 'react'
import Home from './Home/Home'
import { Routes, Route } from 'react-router-dom'
import AboutUs from './About/AboutUs.jsx'
import Contact from './Contact/Contact.jsx'
import Login from './Login/Login.jsx'
import Signup from './Signup/Signup.jsx'
import Generate from './Generate/Generate.jsx'
import Prompt from './Prompt/Prompt.jsx'
import Gallery from './Gallery/Gallery.jsx'
import { BACKEND_URL } from './config.js'
import { Toaster } from 'react-hot-toast';

import axios from "axios";                            
import { useDispatch } from "react-redux";             
import { setUser, clearUser } from "./redux/authSlice" 

function App() {

  const dispatch = useDispatch();                      

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/auth/profile`, {
      withCredentials: true,
    })
    .then(res => {
      if (res.data?.user) {
        dispatch(setUser(res.data.user));             
      } else {
        dispatch(clearUser());
      }
    })
    .catch(() => {
      dispatch(clearUser());
    });
  }, []);

  return (
    <>
     <div className='bg-black min-h-screen '>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<AboutUs/>} />
            <Route path='/contacts' element={<Contact/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/generate' element={<Generate/>} />
            <Route path='/prompt' element={<Prompt/>} />
            <Route path='/gallery' element={<Gallery/>} />
          </Routes>
          <Toaster/>
      </div>
    </>
  )
}

export default App
