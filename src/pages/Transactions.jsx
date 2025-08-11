import React from 'react'
import { useLocation } from 'react-router-dom'


const Transactions = () => {
  let localData = localStorage.getItem('userData')
  let parsedData = localData ? JSON.parse(localData) : {}

  const { historys = [] } = parsedData
  return (

    <div >
      <div className='transactionContainer_all' >
    <h1>All transactions</h1>
      {
        historys.map((history, index) => (
          <div key={index}>
            <p>
              {
                history.type === "Debit" ?
                 `${history.amount}  ${history.to} on ${history.date}`
                  : `${history.amount} ${history.from} on ${history.date}`
              }
            </p>
          </div>
        ))
      }
      </div>
      
    </div>
  )
}

export default Transactions