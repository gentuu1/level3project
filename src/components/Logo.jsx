import React from 'react'
import image1 from '../assets/image.png'
const Logo = () => {
  return (
    <div>
        <div style={{display:'flex', gap:'30px', color:' rgb(55, 57, 140)', marginBottom:'30px'}}>
            <img src={image1}alt=""  height={200} className="logLogo"/>
            <h1>SQI TRUST BANK</h1>
          </div>
    </div>
  )
}

export default Logo