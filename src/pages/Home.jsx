import React from "react";
import { Link, useLocation } from "react-router-dom";


const Home = () => {
    const location = useLocation()
    const stateData = location.state
    const localData = localStorage.getItem('userData')
    let parsedData = localData ? JSON.parse(localData) : {};

    const data = stateData || parsedData

    const { message, balance, accountNumber, historys = [] } = data

    return (
        <div className="home-container">
            <div className="search-container">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="search" name="" id="" placeholder="search" />
            </div>

            <header className="welcome-header">
                <h2 className=".messageh2">{message}</h2>
                <p>Here's an overview of your account.</p>
            </header>

            <section className="account-overview">
                <div className="account-view">
                    <h3> Main Account</h3>
                    <p className="balance">balance: ${balance}</p>
                    <small className="account-number">account No: {accountNumber}</small>
                </div>
            </section>

            <section className="quick-actions">
                <h4>Quick Actions</h4>

                <div className="actions-container">
                    <Link className="link" to="/Dashboard/Transfer">
                        <i class="fa-solid fa-arrow-right-arrow-left"></i>
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

                    <Link className="link" to="dashboard/transactions">
                        <i class="fa-solid fa-clock-rotate-left"></i>
                        <h4>Transactions</h4>
                    </Link>
                </div>

                <div className="transactionContainer">
                    <h1>transactions</h1>  <Link className="Llink" to={'/Dashboard/transaction'}>view all</Link>
                    {
                        historys.map((history, index) => (
                            <div key={index}>
                                <p>
                                    {history.type === 'Debit'
                                        ? `${history.amount}  ${history.to}`
                                        : `${history.amount} ${history.from}`}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </section>

        </div>
    );
};

export default Home;
