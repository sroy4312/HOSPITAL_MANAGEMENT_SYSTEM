import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from '../Pages/Dashboard';
import Login from '../Pages/Login';
import AddNewDoctor from '../Pages/AddNewDoctor';
import AddNewAdmin from '../Pages/AddNewAdmin';
import Doctor from '../Pages/Doctor';
import Messages from '../Pages/Messages';
import Sidebar from '../Components/Sidebar';

const PageRouters = () => {
  return (
    <div>
        <Router>
            <Sidebar />
            <Routes>
                <Route path="/" element={<Navigate to={"dashboard"} />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/doctor/addnew" element={<AddNewDoctor />} />
                <Route path="/admin/addnew" element={<AddNewAdmin />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/doctors" element={<Doctor />} />
            </Routes>
        </Router>
    </div>
  )
}

export default PageRouters