import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import LogoNav from '../components/LogoNav'


const ForgetpassOtp = () => {
  const [isrequesting, setisrequesting] = useState(false)
  let navigate = useNavigate()

  let formik = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: async (values) => {
      try {
        setisrequesting(true)
        let res = await axios.post('http://localhost:3000/user/forgetpasswordotp', values)
        console.log(res.data);
        
        if (res.data.status == false) {
          alert(res.data.message)
          setisrequesting(false)
          return
        }

        alert(res.data.message)
        navigate('/forgetpassword')

      } catch (error) {
        console.log(error);
      }
      setisrequesting(false)
    },
    validationSchema: yup.object({
      email: yup.string().email('email not valid').required("email is required")
    })



  })
  return (
    <div style={{ backgroundColor: '#FFFDF3', height: '110dvh' }}>
      <LogoNav/>
      <div className='updatePassContainer'>
        <h1 >Request confirmation Code</h1>
        <div className='requestCon'>
          <input className='request_input' type="email" name="email" placeholder='Email' onChange={formik.handleChange} />
        <small style={{color:'red'}}>
          {
            formik.errors.email? formik.errors.email : ''
          }
        </small>
        <button type='submit' onClick={formik.handleSubmit} className='requestOtp_but'>
          {
            isrequesting? 'Requesting' : 'Request'
          }
        </button>
        </div>
      </div>
    </div>
  )
}

export default ForgetpassOtp