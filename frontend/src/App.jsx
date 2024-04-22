import { useContext, useEffect } from 'react'
import './App.css'
import PageRoutes from './Routes/PageRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from './main';
import axios from "axios";

const App = () => {
  const {isAuthenticated, setIsAuthenticated, setUser} = useContext(Context);
  useEffect(() => {
    const fetchUser = async() => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/patient/me", {
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
      <PageRoutes />
      <ToastContainer position="top-center" />
    </>
  )
}

export default App
