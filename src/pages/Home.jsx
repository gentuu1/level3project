import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";



const Home = () => {
    let navigate = useNavigate()
    let token = localStorage.getItem('token')
    let localAcountnum = localStorage.getItem(`userData`)
    let parsedaccountnum = JSON.parse(localAcountnum)
    let data = parsedaccountnum ? parsedaccountnum : {}
    const { accountNumber } = data

    const [isbalance, setisbalance] = useState(null)
    const [ismessage, setismessage] = useState(null)
    const [ishistorys, setishistorys] = useState([])
    const [isaccountNumber, setisaccountNumber] = useState(null)

    useEffect(() => {
        const homeDetails = async () => {
            try {
                let res = await axios.post('http://localhost:3000/user/home', { accountNumber },
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                )
                
                if(res.data.message === 'session expired'){
                    alert('session expired')
                    navigate('/')
                    return
                }
                
                if (res.data.message === 'error loading user, relogin') {
                    navigate('/')
                    return
                }

                if (res.data.status == false) {
                    alert(res.data.message)
                    return
                }


                setisbalance(res.data.balance)
                setismessage(res.data.message)
                setishistorys(res.data.historys)
                setisaccountNumber(res.data.accountNumber)
            } catch (error) {
                console.log(error);

            }

        }
        setisbalance(null)
        setismessage(null)
        setishistorys([])
        setisaccountNumber(null)
        homeDetails()
    }, [])


    return (
        <div className="home-container">
            <div className="search-container">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="search" name="" id="" placeholder="search" />
            </div>

            <header className="welcome-header">
                <h2 className=".messageh2">
                    {
                        ismessage ? ismessage : ''
                    }
                </h2>
                <p>Here's an overview of your account.</p>
            </header>

            <section className="account-overview">
                <div className="account-view">
                    <h3> Main Account</h3>
                    <p className="balance">
                        {
                            isbalance ? `balance: $${isbalance}` : ''
                        }
                    </p>
                    <small className="account-number">
                        {
                            isaccountNumber ? `Account No: $${isaccountNumber}` : ''
                        }
                    </small>
                </div>
            </section>

            <section className="quick-actions">
                <h4>Quick Actions</h4>

                <div className="actions-container">
                    <Link className="link" to="/Dashboard/Transfer">
                        <i className="fa-solid fa-arrow-right-arrow-left"></i>
                        <h4>Transfer</h4>
                    </Link>

                    <Link className="link" to="/dashboard/deposit">
                        <i class="fa-solid fa-money-bill-wave"></i>
                        <h4>Deposit</h4>
                    </Link>
                    <Link className="link" to="">
                        <i class="fa-solid fa-mobile-screen-button"></i>
                        <h4>Buy Airtime</h4>
                    </Link>

                    <Link className="link" to="/dashboard/transaction">
                        <i class="fa-solid fa-clock-rotate-left"></i>
                        <h4>Transactions</h4>
                    </Link>
                </div>

                <div className="transactionContainer">
                    <h1>transactions</h1>  <Link className="Llink" to={'/Dashboard/transaction'}>view all</Link>
                    {
                        ishistorys ? ishistorys.map((history, index) => (
                            <div key={index}>
                                <p>
                                    {history.type === 'Debit'
                                        ? `${history.amount}  ${history.to}`
                                        : `${history.amount} ${history.from}`}
                                </p>
                            </div>
                        )) : ''
                    }
                </div>
            </section>

        </div>
    );
};

export default Home;
