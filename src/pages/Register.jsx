import React, { useState } from 'react'
import axios from 'axios';
import * as yup from "yup";
import { Formik, useFormik } from 'formik';
import LogoNav from '../components/LogoNav'
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Register = () => {
let navigate = useNavigate();
const [iscreating, setiscreating] = useState(false)

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    onSubmit: async(values) => {
      try {
        setiscreating(true)
      let response = await axios.post('https://backendproject-rxcq.onrender.com/user/register', values)
      if(response.data.status == false){
          navigate('/Register')
          alert(`${response.data.message}`);
          setiscreating(false)
      }
      else{
        navigate('/login')
        alert(`${response.data.message}`);
      }
      } catch (error) {
        console.log(error);
      }
      setiscreating(false)
    },
    validationSchema: yup.object({
      name: yup.string().required('Fullname is required'),
      email: yup.string()
        .required('Email is required')
        .email('please enter a valid email'),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character"),

    })

  })


  return (


    <div style={{ backgroundColor: '#FFFDF3', height: '110dvh' }} >
      <LogoNav />
      <div className="container">
        <div style={{ color: 'white', textAlign: 'center', lineHeight: '10px' }}>
          <h1>Create Account!</h1>
          <p>Already have an account? <Link to={'/login'}>Login here</Link></p>
        </div>


        <div className="inputcontainerLog">
          <input type="text" name='name' placeholder='fullName' onChange={formik.handleChange} />
          {
            formik.errors.name ? (
              <small style={{ color: 'red' }}>{formik.errors.name}</small>
            ) : (
              ''
            )
          }

          <input type="text" name="email" placeholder=" email address" onChange={formik.handleChange} />
          {
            formik.errors.email ? (
              <small style={{ color: 'red' }}>{formik.errors.email}</small>
            ) : (
              ''
            )
          }

          <input type="password" name="password" placeholder="password" onChange={formik.handleChange} />
          {
            formik.errors.password ? (
              <small style={{ color: 'red' }}>{formik.errors.password}</small>
            ) : (
              ''
            )
          }

          <button type="submit" onClick={formik.handleSubmit} >
            {
              iscreating? 'creating..' : 'Create'
            }
          </button>
        </div>


        <div className="hrContainer">
          <hr />
          <h6>OR</h6>
          <hr />
        </div>

        <div className="iconLog">
          <a href=""> <i className="fa-brands fa-apple"></i></a>
          <a href=""> <i className="fa-brands fa-google"></i></a>
          <a href=""> <i className="fa-brands fa-x-twitter"></i></a>
        </div>
      </div>
    </div>
  )
}

export default Register