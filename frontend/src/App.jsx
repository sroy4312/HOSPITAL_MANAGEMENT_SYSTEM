import { useState } from 'react'
import './App.css'
import PageRoutes from './Routes/PageRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <PageRoutes />
      <ToastContainer position="top-center" />
    </>
  )
}

export default App
