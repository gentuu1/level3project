import { Route, Router, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Transfer from "./pages/Transfer"
import Transactions from "./pages/Transactions"
import ForgetPassword from "./pages/ForgetPassword"
import Deposit from "./pages/Deposit"
import Changepass from "./pages/Changepass"
import RequestOtp from "./pages/RequestOtp"
import Settings from "./pages/Settings"
import ForgetpassOtp from "./pages/ForgetpassOtp"
// import ProtectedRoute from "../ProtectedRoute"



function App() {


  return (
    <>
      <Routes>
   

        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword/>}/>
        <Route path="/forgetpasswordotp" element={<ForgetpassOtp/>}/>


        <Route path="dashboard" element={<Dashboard/>}>
         <Route path="deposit" element={<Deposit/>} />
          <Route index element={<Home />} />
          <Route path="settings" element={<Settings/>}/>
          <Route path="profile" element={< Profile/>} />
          <Route path="transfer" element={<Transfer/>}/>
          <Route path="transaction" element={<Transactions/>}/>
          <Route path="changepassword" element={<Changepass/>}/>
          <Route path="requestotp" element={<RequestOtp/>}/>
        </Route>
      </Routes>

      

    </>
  )
}

export default App
