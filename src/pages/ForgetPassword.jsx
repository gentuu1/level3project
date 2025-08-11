import React from 'react'
import LogoNav from '../components/LogoNav'
import { Navigate, useNavigate } from 'react-router-dom'
import { Formik, useFormik } from 'formik'
import axios from 'axios'
import * as yup from 'yup'

const ForgetPassword = () => {
    let navigate = useNavigate()

    let formik = useFormik({
        initialValues: {
            email: '',
            newPassword:''
        },
        onSubmit: async (values) => {
            let response = await axios.post('http://localhost:3000/user/forgetpassword', values)
            if (response.data.status == false) {
                navigate('/forgetpassword')
                alert(`${response.data.message}`)
            } else {
                navigate('/login')
                alert(`${response.data.message}`)
            }
        },
        validationSchema: yup.object({
            email: yup.string()
                .required('Email is required')
                .email('please enter a valid email'),
            newPassword: yup
                .string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters")
                .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
                .matches(/[a-z]/, "Password must contain at least one lowercase letter")
                .matches(/[@$!%*?&]/, "Password must contain at least one special character"),
        })

    })

    return (
        <div style={{ backgroundColor: '#FFFDF3', height: '110dvh' }}>
            <LogoNav />
            <div className='updatePassContainer'>
                <div className="headerText">
                    <h1>Update Password</h1>
                    <p>click here to </p>
                    <a href="login">login</a>
                </div>

                <div>
                    <input type="email" name='email' placeholder='input email' onChange={formik.handleChange} />
                    {
                        formik.errors.email ? (
                            <small style={{color:'red'}}>{formik.errors.email}</small>
                        ):''
                    }

                    <input type="password" name="newPassword" placeholder='new password' onChange={formik.handleChange} />
                     {
                        formik.errors.newPassword ? (
                            <small style={{color:'red'}}>{formik.errors.newPassword}</small>
                        ):''
                    }
                    <button type="submit" onClick={formik.handleSubmit}>Update password</button>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword