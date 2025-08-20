import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import usestate from 'usestate'
import ChangePassword from '../components/ChangePassword'
import DeleteAccount from '../components/DeleteAccount'

const Profile = () => {

  let navigate  = useNavigate()
  let token = localStorage.getItem('token')
  let localData = localStorage.getItem('userData')
  let parsedData = JSON.parse(localData)
  let data = parsedData || {}
  let { accountNumber } = data || ''

  const [name, setname] = useState(null)
  const [balance, setbalance] = useState(null)
  const [email, setemail] = useState(null)
  const [date, setdate] = useState(null)
  const [accountNum, setaccountNum] = useState(null)


  useEffect(() => {
    const profileDetails = async () => {
      try {
        let res = await axios.get(`https://backendproject-rxcq.onrender.com/user/profile/${accountNumber}`,
           {headers:{
            "Authorization":`Bearer ${token}`,
            'Content-Type':'application/json'
          }}
        )

        if (res.data.status == false) {
          alert(res.data.message)
          navigate('/')
          return
        }

        setname(res.data.name)
        setbalance(res.data.balance)
        setemail(res.data.email)
        setdate(res.data.date)
        setaccountNum(res.data.accountNumber)

      } catch (error) {
        console.log(error);

      }
    }
    setname(null)
      setbalance(null)
      setemail(null)
      setdate(null)
    profileDetails()
  }, [])
  return (

    <div className="profile-container">
      <h1>profile</h1>

      <div className='accountDetails_container'>
        <p> Full Name: <small>
          {
            name? (<small>{name}</small>) : ''
          }
          </small></p>
        <p> Email: <small>
          {
            email? (<small>{email}</small>) :''
          }
          </small></p>
        <p> account number: <small>
          {
            accountNum? (<small>{accountNum}</small>) : ''
          }
          </small></p>
      </div>

      <div className='accountSummary_container'>
        <h2>account summary</h2>
        <p>Balance: <small>
          {
            balance?( <small>${balance}</small>) :''
          }
          </small></p>
        <p>Status: <small>active</small></p>
      </div>

      <div className='accountSecurity_container'>
        <h2>security settings</h2>
        <p>Date joined: <small>
            {
              date? (<small>{date}</small>) :''
            }
          </small></p>
        <ChangePassword/>
      </div>

      <DeleteAccount/>
    </div>
  )
}

export default Profile