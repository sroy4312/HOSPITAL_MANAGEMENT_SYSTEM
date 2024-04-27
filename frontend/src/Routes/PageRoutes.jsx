import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Appointment from '../pages/Appointment';
import AboutUs from '../pages/AboutUs';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Forgot_Password from '../pages/ForgotPassword';
import Reset_Password from '../pages/ResetPassword';
import Navbar from '../components/Navbar';
import { Context } from '../main';
import axios from "axios";
import Footer from '../components/Footer';

const PageRoutes = () => {
  const {isAuthenticated, setIsAuthenticated, user, setUser} = useContext(Context);
  useEffect(() => {
    const fetchUser = async() => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/patient/me", {
          withCredentials: true
        });
        setIsAuthenticated(true);
        setUser(response.data.user)
      } catch (err) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);
  return (
    <Router>
        <Navbar />
        <Routes>
            <Route path='/' element={<Navigate to='home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/appointment' element={<Appointment />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgot-password' element={<Forgot_Password />} />
            <Route path='/reset-password' element={<Reset_Password />} />
        </Routes>
        <Footer />
    </Router>
  )
}

export default PageRoutes