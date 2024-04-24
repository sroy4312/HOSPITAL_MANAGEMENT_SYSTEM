import React, { useState, useContext } from "react";
import { Context } from "../main";
import { useNavigate, Navigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import logo from '../assets/logo.png';

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } =
    useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/user/login",
          { email, password, confirmPassword, role: "Admin" },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigate("/");
        });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  const onLogin = () => {};
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className='container form-component'>
      <img src={logo} alt="logo" className="logo" />
      <h1 className="form-title">Welcome to trucare</h1>
      <p style={{color: "red"}}>Only admins are allowed to access this resource</p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm your password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
