import React from 'react'
import image from '../assets/image.png'

const LogoNav = () => {
  return (
    <div>
         <nav className='trust_nav'>

       <div className='trustLogoCON'>
         <img className='trustLogo' src={image} height={100} alt="" />
         <h1 className='SQI' style={{paddingTop:'20px', color:'#000E42'}}>SQI TRUSTBANK</h1>
       </div>

        <div style={{display:'flex'}}>
          <img className='licenseLogo' src={image} height={30} alt="" style={{paddingTop:'50px'}} />
          <small className='small' style={{paddingTop:'60px'}}>Licensed by SQI</small>
        </div>
      </nav>
    </div>
  )
}

export default LogoNav