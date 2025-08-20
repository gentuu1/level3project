import React, { useState } from "react";
import Logo from "../components/Logo";
import LogoNav from "../components/LogoNav";
import { Formik, useFormik } from "formik";
import axios from "axios";
import * as yup from 'yup'
import { Link, Navigate, useNavigate } from "react-router-dom";
import usestate from "usestate";
const Login = () => {
  const [loginin, setloginin] = useState(false)
  let navigate = useNavigate()

  let formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },
     onSubmit:async(values)=>{
      setloginin(true)
       let response = await axios.post('https://backendproject-rxcq.onrender.com/user/login', values)
       if(response.data.status == false){
         navigate('/login')
         alert(`${response.data.message}`)
       }
       else{
         const userData = {
           accountNumber : response.data.accountNumber,
           id: response.data._id
          }
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('userData', JSON.stringify(userData))
          navigate('/dashboard');
          alert(`logged in successful`)
       }
       setloginin(false)
     },

    validationSchema: yup.object({
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
    <div style={{backgroundColor:'#FFFDF3', height:'110dvh'}} >
       <LogoNav/>
       <div className="container">
          <div  style={{color:'white', textAlign:'center', lineHeight:'10px'}}>
             <h1>Welcome Back</h1>
          <p>Don't have an account yet? <Link className="llink" to={'/register'}>Sign Up</Link></p>
          </div>

          <div className="inputcontainerLog">

            <input type="text" name="email"  placeholder=" email address" onChange={formik.handleChange}/>
              {
                formik.errors.email ? (
                  <small style={{color:'red'}}>{formik.errors.email}</small>
                ):''
              }

            <input type="password" name="password" placeholder="password" onChange={formik.handleChange}/>
               {
                formik.errors.password ? (
                  <small style={{color:'red'}}>{formik.errors.password}</small>
                ):''
              }

            <button type="submit" onClick={formik.handleSubmit} disabled={loginin}>
              {
                loginin? 'Logging in...' : 'Login'
              }
              </button>
            <Link className="forgetLink" to={'/forgetpasswordotp'}>forget password?</Link>
          </div>

            <div  className="hrContainer">
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
  );
};

export default Login;
