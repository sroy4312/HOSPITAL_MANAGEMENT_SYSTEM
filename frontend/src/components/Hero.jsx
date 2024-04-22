import React from 'react'
import Vector from '../assets/Vector.png'

const Hero = ({title, details, imageUrl}) => {
  return (
    <div className='hero container'>
        <div className='banner'>
            <h1>{title}</h1>
            <p>{details}</p>
        </div>
        <div className='banner'>
            <img src={imageUrl} alt="hero" className='animated-image' />
            <span>
                <img src={Vector} alt="vector" />
            </span>
        </div>
    </div>
  )
}

export default Hero