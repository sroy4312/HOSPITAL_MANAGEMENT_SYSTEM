import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify"

const ForgotPassword = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(Context);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  return (
    <div className='container form-component login-form'>
      <h2>Reset password</h2>
      <p>Please enter email to reset your password</p>
      <p>A link has been sent to your email to reset your password</p>
      <form>
        <input type="text" value={email} placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
        <div style={{justifyContent: "center", alignItems: "center"}}>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword;