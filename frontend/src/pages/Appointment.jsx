import React from 'react';
import Hero from '../components/Hero';
import AppointmentForm from '../components/AppointmentForm';
import signin from '../assets/signin.png'

const Appointment = () => {
  return (
    <div>
      <Hero title={"Book your appointment"} details={"Trucare is a state-of-the-art facility dedicated to providing comprehensive healthcare services with compassion and expertise. Our team of skilled professionals is committed to delivering personalized care tailored to each patient's needs. At Trucare, we prioritize your well-being, ensuring a harmonious journey towards optimal health and wellness."} imageUrl={signin} />
      <AppointmentForm />
    </div>
  )
}

export default Appointment;    