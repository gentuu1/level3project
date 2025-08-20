import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

const Changepass = () => {
    let navigate = useNavigate()
    let token = localStorage.getItem('token')
    const [isloading, setisloading] = useState(false)

    let formik = useFormik({
        initialValues: {
            email: '',
            otp: '',
            password: '',
            newPassword: ''
        },
        onSubmit: async (values) => {
            try {
                setisloading(true)
                let res = await axios.post('https://backendproject-rxcq.onrender.com/user/changepassword',
                    values,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                )

                if (res.data.message === 'session expired') {
                    alert('session expired')
                    navigate('/')
                    return
                }

                if (res.data.status == false) {
                    alert(res.data.message)
                    navigate('/dashboard/changepassword')
                    setisloading(false)
                    return
                }

                alert(res.data.message)
                navigate('/dashboard/profile')

            } catch (error) {
                console.log(error);

            }
            setisloading(false)
        },

        validationSchema: yup.object({
            email: yup.string().email('input a valid email').required('email is required'),
            otp: yup.string().required('otp is required'),
            password: yup.string().required('password is required'),
            newPassword: yup.string()
                .required("New Password is required")
                .min(8, "New Password must be at least 8 characters")
                .matches(/[A-Z]/, "New Password must contain at least one uppercase letter")
                .matches(/[a-z]/, "New Password must contain at least one lowercase letter")
                .matches(/[@$!%*?&]/, "New Password must contain at least one special character"),
        })
    })

    return (
        <div>
            <div className='changePass'>
                <h1>Change Password</h1>

                <div className='changepassword_Container'>
                    <input type="email" placeholder='input email' name='email' onChange={formik.handleChange} />
                    <small style={{color:'red'}} >
                        {
                            formik.errors.email ? formik.errors.email : ''
                        }
                    </small>

                    <input type="text" placeholder='input OTP' name='otp' onChange={formik.handleChange} />
                    <small style={{color:'red'}} >
                        {
                            formik.errors.otp ? formik.errors.otp : ''
                        }
                    </small>

                    <input type="password" name="password" placeholder='input old password' onChange={formik.handleChange} />
                    <small style={{color:'red'}} >
                        {
                            formik.errors.password ? formik.errors.password : ''
                        }
                    </small>

                    <input type="password" name="newPassword" placeholder='New password' onChange={formik.handleChange} />
                    <small style={{color:'red'}} >
                        {
                            formik.errors.newPassword ? formik.errors.newPassword : ''
                        }
                    </small>
                    <button type='submit' onClick={formik.handleSubmit}>Change</button>
                </div>
            </div>
        </div>
    )
}

export default Changepass