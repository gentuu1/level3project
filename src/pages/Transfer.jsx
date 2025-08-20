import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'

import { Navigate, useLocation, useNavigate } from 'react-router-dom'




const Transfer = () => {

  let navigate = useNavigate()
  let token = localStorage.getItem('token')
  let localAcountnum = localStorage.getItem('userData')
  let parsedData = JSON.parse(localAcountnum)
  let data = parsedData ? parsedData : {}
  const { accountNumber } = data

  const [transferResponse, setTransferResponse] = useState(null)
  const [isSending, setisSending] = useState(false)
  const [receiverName, setReceiverName] = useState('')
  const [loadingName, setLoadingName] = useState(false)

  let formik = useFormik({
    initialValues: {
      accountNum: '',
      amount: ''
    },
    onSubmit: async (values) => {
      const senderAccountNumber = accountNumber
      const receiverAccountNumber = formik.values.accountNum
      const amount = formik.values.amount
      try {
        setisSending(true)
        let response = await axios.post(
          'https://backendproject-rxcq.onrender.com/user/transfer',
          {
            senderAccountNumber,
            receiverAccountNumber,
            amount
          },
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        )

        if (formik.values.accountNum == '') {
          setisSending(false)
          navigate('/dashboard/transfer')
          alert('input account number')
          return
        }

        if (response.data.message === 'session expired') {
          alert('session expired')
          navigate('/')
          return
        }

        if (response.data.status == false) {
          alert(`${response.data.message}`)
          navigate('/dashboard/transfer')
          setisSending(false)
          return
        }

        if (response.data.message === 'error: login again') {
          setisSending(false)
          return navigate('/')
        }
        else {
          console.log(response.data);

          navigate('/dashboard')
          alert(`${response.data.message}`)
        }
      } catch (error) {
        console.log(error);
      }
      setisSending(false)
    },
    validationSchema: yup.object({
      amount: yup.number('input an amount')
    })
  })
  // setisSending(false)

  useEffect(() => {
    const resolveAccount = async () => {
      const accountNum = formik.values.accountNum.trim()

      if (accountNum.length === 0) {
        setReceiverName('')
        return
      }
      else {
        try {
          setLoadingName(true)
          let res = await axios.get(`https://backendproject-rxcq.onrender.com/user/resolve/${accountNum}`,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          )

          if (res.data.status == false) {
            setTransferResponse(res.data.message)
            // setReceiverName('')
          }
          else {
            setReceiverName(res.data.accountName)
            setTransferResponse(null)

          }
        } catch (error) {

          console.log(error)
        }

        setLoadingName(false)

      }
    }

    resolveAccount()

  }, [formik.values.accountNum])



  return (
    <div className="transfer-box">
      <h3>Transfer Money</h3>

      <input
        type="text"
        name="accountNum"
        placeholder="Enter account number"
        onChange={formik.handleChange}
      />

      {loadingName ? (
        <small className="account-name">Checking account...</small>
      ) : transferResponse === 'User not found' ? (
        <small className="account-name" style={{ color: 'red' }}>{transferResponse}</small>
      ) : receiverName ? <small className="account-name">{receiverName}</small> : ''
      }

      <input
        type="number"
        name="amount"
        placeholder="Enter amount"
        onChange={formik.handleChange}
      />
      <button type="submit" onClick={formik.handleSubmit}>
        {
          isSending ? 'sending....' : 'send'
        }
      </button>
    </div>
  )
}

export default Transfer