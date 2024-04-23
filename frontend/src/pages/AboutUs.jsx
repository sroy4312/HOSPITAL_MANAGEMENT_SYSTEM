import React from 'react';
import Hero from '../components/Hero';
import hero from '../assets/hero.png';
import Biography from '../components/Biography';
import who from '../assets/whoweare.png';

const AboutUs = () => {
  return (
    <div>
      <Hero title={"More about us"} details={"Trucare is a state-of-the-art facility dedicated to providing comprehensive healthcare services with compassion and expertise. Our team of skilled professionals is committed to delivering personalized care tailored to each patient's needs. At Trucare, we prioritize your well-being, ensuring a harmonious journey towards optimal health and wellness."} imageUrl={hero} />
      <Biography imageUrl={who} />
    </div>
  )
}

export default AboutUs;