import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Formik, useFormik } from 'formik'
import axios from 'axios'
import * as yup from 'yup'

const Deposit = () => {
    let navigate = useNavigate()
    let token = localStorage.getItem('token')
    let localAcountnum = localStorage.getItem('userData')
    let parsedData = JSON.parse(localAcountnum)
    let data = parsedData ? parsedData : {}

    const { accountNumber } = data


    let formik = useFormik({
        initialValues: {
            accountNumber: accountNumber,
            amount: ''
        },
        onSubmit: async (values) => {
            let res = await axios.post('https://backendproject-rxcq.onrender.com/user/deposit', values,
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
                return navigate('/dashboard/deposit')
                
            }
            alert(res.data.message)
            navigate('/dashboard/')
        }

    })

    return (

        <div>
            <div className='depositContainer'>
                <h1>Deposit</h1>
                <input type="number" name="amount" id="" placeholder='input deposit amount' onChange={formik.handleChange} />
                <button type="submit" onClick={formik.handleSubmit}>Deposit</button>
            </div>
        </div>
    )
}

export default Deposit