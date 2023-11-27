import React from 'react'
import backgroundImage from './cc.jpg'

const Home = () => {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2rem',
  }

  return (
    <div style={containerStyle}>
      <div>
      </div>
    </div>
  )
}

export default Home
