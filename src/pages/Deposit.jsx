import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Formik, useFormik } from 'formik'
import axios from 'axios'
import * as yup from 'yup'

const Deposit = () => {
    let navigate = useNavigate()
    const location = useLocation()
    const stateData = location.state
    const token = localStorage.getItem('token')
    let localData = localStorage.getItem('userData')
    const parsedData = localData ? JSON.parse(localData) : {}
    let data = token? parsedData || stateData : ''

    const { accountNumber } = data


    let formik = useFormik({
        initialValues: {
            accountNumber: accountNumber,
            amount: ''
        },
        onSubmit: async (values) => {
            console.log(values);
            let res = await axios.post('http://localhost:3000/user/deposit', values)
            console.log(res.data);
            
            if (res.data.status == false) {
                alert(res.data.message)
                return navigate('/')
            }
            const updateData = {...parsedData, balance:res.data.newBalance, historys:res.data.newhistory}
            localStorage.setItem('userData', JSON.stringify(updateData))
            alert(res.data.message)
            navigate('/dashboard/', {state:updateData})
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