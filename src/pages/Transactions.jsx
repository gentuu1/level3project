import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import usestate from 'usestate'


const Transactions = () => {
  let navigate = useNavigate()
  let token = localStorage.getItem('token')
  let localAcountnum = localStorage.getItem('userData')
  let parsedData = JSON.parse(localAcountnum)
  const data = parsedData ? parsedData : {}
  const { accountNumber } = data

  const [ishistorys, setishistorys] = useState([])
  const [isloading, setisloading] = useState(false)

  useEffect(() => {
    const transactions = async () => {
      try {
        setisloading(true)
        let res = await axios.get(`https://backendproject-rxcq.onrender.com/user/transaction/${accountNumber}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (res.data.message === 'session expired') {
          alert('session expired')
          navigate('/')
          return
        }

        if (res.data.status == false) {
          alert(res.data.message)
          return
        }

        setishistorys(res.data.historys)
      } catch (error) {
        console.log(error);
      }
      setisloading(false)
    }
    setishistorys([])
    transactions()
  }, [])

  return (

    <div >
      {
        isloading ? (<div class="spinner-border text-secondary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>) : <div className='transactionContainer_all' >
          <h1>All transactions</h1>
          {
            ishistorys ? ishistorys.map((history, index) => (
              <div key={index}>
                <p>
                  {
                    history.type === "Debit" ?
                      `${history.amount}  ${history.to} on ${history.date}`
                      : `${history.amount} ${history.from} on ${history.date}`
                  }
                </p>
              </div>
            )) : []
          }
        </div>
      }

    </div>
  )
}

export default Transactions