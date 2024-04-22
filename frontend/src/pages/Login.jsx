import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify"

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
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
        <div style={{justifyContent: "center", alignItems: "center"}}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login