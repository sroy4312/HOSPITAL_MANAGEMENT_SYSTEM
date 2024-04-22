import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Appointment from '../pages/Appointment';
import AboutUs from '../pages/AboutUs';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Navbar from '../components/Navbar';

const PageRoutes = () => {
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
        </Routes>
    </Router>
  )
}

export default PageRoutes