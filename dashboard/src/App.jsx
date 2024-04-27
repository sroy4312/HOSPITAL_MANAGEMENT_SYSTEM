import React, { useContext, useEffect } from 'react'
import PageRouters from './Routes/PageRouters'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import { Context } from "./main";
import axios from "axios";

const App = () => {
  const {isAuthenticated, setIsAuthenticated, setUser} = useContext(Context);
  useEffect(() => {
    const fetchUser = async() => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/admin/me", {
          withCredentials: true
        });
        setIsAuthenticated(true);
        setUser(response.data.user)
      } catch (err) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);
  return (
    <>
      <PageRouters />
      <ToastContainer position="top-center" />
    </>
  )
}

export default App