import React from 'react';
import './Home.css'

const Home = () => {
  
  return (
    <div className='outerContainer'>
      <a className='homeLink' href={'/join'}>
        <h1 className='homeH1'>WMChat <span role="img" aria-label="emoji"> 💬</span></h1>
      </a>
    </div> 
  )

}

export default Home;