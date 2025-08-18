import React from 'react'
import { useNavigate } from 'react-router-dom'



const ChangePassword = () => {
    let navigate = useNavigate()

    const change_password = () =>{
        navigate('/dashboard/requestotp')
    }
  return (
    <div>
        <button className='change_password' onClick={()=>change_password()}> Change Password</button>
    </div>
  )
}

export default ChangePassword