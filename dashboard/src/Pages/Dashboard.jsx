import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import doc from "../assets/doc.png";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const { isAuthenticated, user } = useContext(Context);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        await axios
          .get("http://localhost:4000/api/v1/appointment/get_appointments", {
            withCredentials: true,
          })
          .then((res) => {
            setAppointments(res.data.appointments);
          });
      } catch (err) {
        setAppointments([]);
        toast.error(err.response.data.message);
      }
    };
    fetchAppointments();
  });
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        await axios
          .get("http://localhost:4000/api/v1/user/doctors", {
            withCredentials: true,
          })
          .then((res) => {
            setDoctors(res.data.doctors);
          });
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };
    fetchDoctors();
  }, []);
  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      await axios
        .put(
          `http://localhost:4000/api/v1/appointment/update_appointment/${appointmentId}`,
          { status },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setAppointments((prevAppointments) => {
            prevAppointments.map((appointment) => {
              appointment._id === appointmentId
                ? { ...appointment, status }
                : appointment;
            });
          });
          toast.success(res.data.message);
        });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src={doc} alt="doctor_image" />
            <div className="content">
              <div>
                <p>Hello, </p>
                <h5>{user && `${user?.firstName} ${user?.lastName}`}</h5>
              </div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total appointments</p>
            <h3>{appointments?.length}</h3>
          </div>
          <div className="thirdBox">
            <p>Registered doctors</p>
            <h3>{doctors?.length}</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th>Patient name</th>
                <th>Date</th>
                <th>Doctor name</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0 ? (
                appointments.map((appointment) => {
                  return (
                    <tr key={appointment._id}>
                      <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                      <td>{appointment.appointment_date.substring(0, 16)}</td>
                      <td>{`${appointment.doctor.firstname} ${appointment.doctor.lastname}`}</td>
                      <td>{appointment.department}</td>
                      <td>
                        <select
                          className={
                            appointment.status === "Pending"
                              ? "value-pending"
                              : appointment.status === "Rejected"
                              ? "value-rejected"
                              : "value-accepted"
                          }
                          value={appointment.status}
                          onChange={(e) =>
                            handleUpdateStatus(appointment._id, e.target.value)
                          }
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </select>
                      </td>
                      <td>
                        {appointment.hasVisited === true ? (
                          <GoCheckCircleFill className="green" />
                        ) : (
                          <AiFillCloseCircle className="red" />
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <h1>No appointments found</h1>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
