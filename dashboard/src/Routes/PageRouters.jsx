import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from '../Pages/Dashboard';
import Login from '../Pages/Login';
import AddNewDoctor from '../Pages/AddNewDoctor';
import AddNewAdmin from '../Pages/AddNewAdmin';
import Doctor from '../Pages/Doctor';
import Messages from '../Pages/Messages';
import Sidebar from '../Components/Sidebar';
import { Context } from "../main";
import axios from "axios";

const PageRouters = () => {
  const {isAuthenticated, setIsAuthenticated, user, setUser} = useContext(Context);
  useEffect(() => {
    const fetchUser = async() => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/admin/me", {
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