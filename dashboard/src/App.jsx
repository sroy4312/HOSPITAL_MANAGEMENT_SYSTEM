import React from 'react'
import PageRouters from './Routes/PageRouters'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import './App.css';

const App = () => {
  return (
    <>
      <PageRouters />
      <ToastContainer position="top-center" />
    </>
  )
}

export default App