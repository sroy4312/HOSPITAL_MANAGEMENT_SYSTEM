import React, { useContext, useState } from 'react';
import { Context } from '../main';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async(e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/v1/user/patient/register", {
        firstName, lastName, email, phone, nic, dob, gender, password, role: "Patient"
      }, {
        withCredentials: true,
        headers: {
        "Content-Type": "application/json"
        }
      }).then(res => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigate("/login");
      })
    } catch (err) {
        toast.error(err.response.data.message);
    }
  }
  if(isAuthenticated) {
    return (
      <Navigate to={"/"} />
    )
  }
  return (
    <div className="container form-component register-form">
      <h2>Register</h2>
      <p>Please sign up to continue</p>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
      <form onSubmit={handleRegister}>
        <div>
          <input type="text" placeholder='Enter firstname' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" placeholder='Enter lastname' value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <input type="text" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="number" placeholder='Enter mobile number' value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <input type="number" placeholder='Enter nic' value={nic} onChange={(e) => setNic(e.target.value)} />
          <input type="date" placeholder='Enter date of birth' value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>
        <div>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div style={{gap: "10px", justifyContent: "space-between", flexDirection: "row"}}>
          <p style={{marginBottom: 0}}>Already have an account?</p>
          <Link to={"/login"} style={{textDecoration: "none", alignItems: "center"}}>Signin</Link>
        </div>
        <div style={{justifyContent: "center", alignItems: "center"}}>
          <button type="submit">Create account</button>
        </div>
      </form>
    </div>
  )
}

export default Register;