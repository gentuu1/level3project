import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

const RequestOtp = () => {
    let token = localStorage.getItem('token')
    let navigate = useNavigate()
    const [isrequesting, setisrequesting] = useState(false)

    let formik = useFormik({
        initialValues: {
            email: '',
        },

        onSubmit: async (values) => {
            try {
                setisrequesting(true)
                let res = await axios.post('https://backendproject-rxcq.onrender.com/user/requestotp',
                    values,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                )
                console.log(res.data);

                if (res.data.messega === 'session expired') {
                    alert('session expired')
                    navigate('/')
                    return
                }
                if (res.data.status == false) {
                    alert(res.data.message)
                    navigate('/dashboard/requestotp')
                    setisrequesting(false)
                    return
                }

                alert(res.data.message)
                navigate('/dashboard/changepassword')


            } catch (error) {
                console.log(error);

            }

            setisrequesting(false)
        },

        validationSchema:yup.object({
            email:yup.string().email('enter a valid email').required('email is required')
        })
    })



    return (
        <div className='requestOtp'>
            <h1>
                Request OTP to Change password
            </h1>

            <div className='requestInputCon'>
                <input type="text" name='email' placeholder='Input email' onChange={ formik.handleChange} /> <br/>
                <small style={{color:'red'}}>
                    {
                        formik.errors.email? formik.errors.email : ''
                    }
                </small>
                <button  type='submit' onClick={formik.handleSubmit}>
                    {
                        isrequesting? 'requesting' : 'Request'
                    }
                </button>
            </div>
        </div>
    )
}

export default RequestOtp