import React from 'react';

const Biography = ({imageUrl, biography}) => {
  return (
    <div className='container biography'>
      <div className='banner'>
        <img src={imageUrl} alt="about" />
      </div>
      <div className='banner'>
        <p>Biography</p>
        <h3>Who are we</h3>
        <p>{biography}</p>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
        <p>Lorem ipsum dolor sit amet!</p>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
        <p>Lorem, ipsum dolor.</p>
      </div>
    </div>
  )
}

export default Biography;