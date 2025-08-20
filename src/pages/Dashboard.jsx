import React from 'react'
import image from '../assets/image.png'
import Logo from '../components/Logo'
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom'
// import Transactions from './Transactions'
import BankLogo from '../assets/bankLogo.jpg'

const Dashboard = () => {
    let navigate = useNavigate()
    const logout = () => {
        let confirm = window.confirm('Are you sure you want to logout?')
        if (!confirm) {
            navigate('/Dashboard/')
            return
        } else {
            alert('user logged out')
            localStorage.removeItem('token')
            localStorage.removeItem('userData')
            navigate('/')
        }
    }

    return (
        <div className='dashboard-layout'>
            <aside className='sidebar'>
                <div className='sidebar-div'>
                    <img src={image} alt=""/>
                    <h1>SQI TRUSTBANK</h1>
                </div>


                <nav>
                    <NavLink to={'/Dashboard/'} className={'nav-item'}>Home</NavLink>
                    <NavLink to={'/Dashboard/profile'} className={'nav-item'}>Profile</NavLink>
                    <NavLink to={'/Dashboard/settings'} className={'nav-item'}>Settings</NavLink>
                    <NavLink to={'/Dashboard/transfer'} className={'nav-item'}>Transfer</NavLink>
                    <button className=" logout" onClick={() => logout()}>Logout</button>
                </nav>
            </aside>

            <div className='main-content'>
                <Outlet />
            </div>

            <div
                style={{
                    width: '25%',
                    overflow: 'hidden'
                }}

                className='sidebarBank'
            ><img src={BankLogo} height={600} alt="" style={{ width: '100%' }} /></div>

        </div>
    )
}

export default Dashboard