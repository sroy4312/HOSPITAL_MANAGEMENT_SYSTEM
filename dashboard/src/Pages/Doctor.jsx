import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from 'react-router-dom';

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context)
  useEffect(() => {
    const fetchDoctors = async() => {
      try {
        await axios.get("http://localhost:4000/api/v1/user/doctors", {
          withCredentials: true
        }).then(res => {
          setDoctors(res.data.doctors)
        })
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };
    fetchDoctors();
  }, [])
  if(!isAuthenticated) {
    return (
      <Navigate to={"/login"} />
    )
  }
  return (
    <div>
      <section className='page doctors'>
        <h1>Doctors</h1>
        <div className='banner'>
        {
           doctors && doctors.length > 0 ? (
            doctors.map((doctor, index) => {
              return (
                <div className='card'>
                  <img src={doctor.docAvatar && doctor.docAvatar.url} alt="Doctor avatar" />
                  <h4>{`${doctor.firstName} ${doctor.lastName}`}</h4>
                  <div className='details'>
                    <p>Email: <span>{doctor.email}</span></p>
                    <p>Mobile number: <span>{doctor.phone}</span></p>
                    <p>Date of birth: <span>{doctor.dob.substring(0, 10)}</span></p>
                    <p>Department: <span>{doctor.doctorDepartment}</span></p>
                    <p>nic: <span>{doctor.nic}</span></p>
                    <p>Gender: <span>{doctor.gender}</span></p>
                  </div>
                </div>
              )
            })
           ) : <h1>No doctors found</h1>
        }
        </div>
      </section>
    </div>
  )
}

export default Doctor