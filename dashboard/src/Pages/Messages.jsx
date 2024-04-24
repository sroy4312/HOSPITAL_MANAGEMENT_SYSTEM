import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchMessages = async() => {
      try {
        await axios.get("http://localhost:4000/api/v1/message/getall", {
          withCredentials: true
        }).then(res => {
          setMessages(res.data.messages);
        })
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };
    fetchMessages();
  }, [])
  if(!isAuthenticated) {
    return (
      <Navigate to={"/login"} />
    )
  }
  return (
    <section className='page messages'>
      <h1>Messages</h1>
      <div className='banner'>
      {
        messages && messages.length > 0 ? (
          messages.map(element => {
            return (
              <div className='card'>
                <div className='details'>
                  <p>Firstname: <span>{element.firstName}</span></p>
                  <p>Lastname: <span>{element.lastName}</span></p>
                  <p>Email: <span>{element.email}</span></p>
                  <p>Mobile number: <span>{element.phone}</span></p>
                  <p>Messages: <span>{element.message}</span></p>
                </div>
              </div>
            )
          })
        ) : (<h1>No messages found</h1>)
      }
      </div>
    </section>
  )
}

export default Messages