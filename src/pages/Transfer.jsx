import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'

import { Navigate, useLocation, useNavigate } from 'react-router-dom'




const Transfer = () => {

  let navigate = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem('token')
  const stateData = location.state
  const localData = localStorage.getItem('userData')
  const parsedData = localData ? JSON.parse(localData) : {}
  const data = token ? stateData || parsedData : ''
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
          'http://localhost:3000/user/transfer',
          {
            senderAccountNumber,
            receiverAccountNumber,
            amount
          })

        if (formik.values.accountNum == '') {
          return alert('input account number')
        }
        // settransferResponse(response.data)
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
          const updateData = { ...parsedData, balance: response.data.newBalance, historys: response.data.history }
          localStorage.setItem('userData', JSON.stringify(updateData))
          navigate('/dashboard', { state: updateData })
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
          let res = await axios.get(`http://localhost:3000/user/resolve/${accountNum}`)
          console.log(res.data);

          if (res.data.status == false) {
            setTransferResponse(res.data.message)
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
      ) : transferResponse === 'user not found' ? (
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