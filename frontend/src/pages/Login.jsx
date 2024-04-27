import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify"
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/v1/user/login", {email, password, confirmPassword, role: "Patient"}, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigate("/")
      })
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }
  const onLogin = () => {
    
  }
  if(isAuthenticated) {
    return (
      <Navigate to="/" />
    )
  }
  return (
    <div className='container form-component login-form'>
      <h2>Sign in</h2>
      <p>Please login to continue</p>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
      <form onSubmit={handleLogin}>
        <input type="text" value={email} placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
        <input type="password" value={confirmPassword} placeholder='Confirm your password' onChange={(e) => setConfirmPassword(e.target.value)} />
        <div style={{gap: "10px", justifyContent: "space-between", flexDirection: "row"}}>
          <p style={{marginBottom: 0}}>Don't have an account?</p>
          <Link to={"/register"} style={{textDecoration: "none", alignItems: "center"}}>Create Account</Link>
        </div>
        <Link to={"/forgot-password"} style={{textDecoration: "none", justifyContent: "flex-start"}}>Forgot password</Link>
        <div style={{justifyContent: "center", alignItems: "center"}}>
          <button type="submit">Login</button>
        </div>
      </form>
      <div>________________________________________________________________________</div>
      <div>
        <button style={{marginTop: "20px", borderRadius: "30px", width: "100%", color: "black", background: "white"}}><FaGoogle style={{marginBottom: "-5px", marginRight: "10px"}} onClick={onLogin} /> Sign in with Google</button>
      </div>
    </div>
  )
}

export default Login