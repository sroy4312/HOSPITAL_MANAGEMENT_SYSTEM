import React from 'react';
import Hero from '../components/Hero';
import Biography from '../components/Biography';
import Departments from '../components/Departments';
import MessageForm from '../components/MessageForm';
import hero from '../assets/hero.png'
import about from '../assets/about.png';

const Home = () => {
  return (
    <div>
      <Hero title={"Welcome to Trucare | Your Trusted Healthcare provider"} details={"Trucare is a state-of-the-art facility dedicated to providing comprehensive healthcare services with compassion and expertise. Our team of skilled professionals is committed to delivering personalized care tailored to each patient's needs. At Trucare, we prioritize your well-being, ensuring a harmonious journey towards optimal health and wellness."} imageUrl={hero} />
      <Biography imageUrl={about} biography={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores assumenda exercitationem accusamus sit repellendus quo optio dolorum corporis corrupti. Quas similique vel minima veniam tenetur obcaecati atque magni suscipit laboriosam! Veniam vitae minus nihil cupiditate natus provident. Ex illum quasi pariatur odit nisi voluptas illo qui ipsum mollitia. Libero, assumenda?"} />
      <Departments />
      <MessageForm title={"Send us a message"} />
    </div>
  )
}

export default Home;