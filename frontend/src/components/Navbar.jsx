import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../main';
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [showFirstName, setShowFirstName] = useState("");
  const navigate = useNavigate();
  const handleLogout = async() => {
    try {
        await axios.get("http://localhost:4000/api/v1/user/patient/logout", {
            withCredentials: true
        }).then(res => {
            toast.success(res.data.message);
            setIsAuthenticated(false);
        })
    } catch (err) {
        toast.error(err.response.data.message);
    }
  }
  axios.get("http://localhost:4000/api/v1/user/patient/me", {
    withCredentials: true
  }).then(res => {
    setIsAuthenticated(true);
    setShowFirstName(res.data.firstName);
  })
  const gotoLogin = () => {
    navigate("/login");
  }
  return (
    <nav className='container'>
        <div className='logo'>Trucare</div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
            <div className='links'>
                <Link to={"/"}>HOME</Link>
                <Link to={'/appointment'}>APPOINTMENT</Link>
                <Link to={'/about'}>ABOUT US</Link>
            </div>
            {
              isAuthenticated ? (<p>{`Welcome ${showFirstName}`}</p>) : (<></>)
            }
            {
                isAuthenticated ? (<button className='logoutBtn btn' onClick={handleLogout}>LOGOUT</button>) : (<button className='logoutBtn btn' onClick={gotoLogin}>LOGIN</button>)
            }
        </div>
    </nav>
  )
}

export default Navbar