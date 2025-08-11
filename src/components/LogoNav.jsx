import React from 'react'
import image from '../assets/image.png'

const LogoNav = () => {
  return (
    <div>
         <nav style={{
        display:'flex',
        justifyContent:'space-between',
         alignItems: "center",
        height:'100px',
        padding:'0px 40px'
      }}>

       <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
         <img src={image} height={100} alt="" />
         <h1 style={{paddingTop:'20px', color:'#000E42'}}>SQI TRUSTBANK</h1>
       </div>

        <div style={{display:'flex'}}>
          <img src={image} height={30} alt="" style={{paddingTop:'50px'}} />
          <small style={{paddingTop:'60px'}}>Licensed by SQI</small>
        </div>
      </nav>
    </div>
  )
}

export default LogoNav