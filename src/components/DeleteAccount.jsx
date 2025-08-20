import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const DeleteAccount = () => {
    let navigate = useNavigate()

    const deleteAcc = async() => {
        let confirmDelete = window.confirm('Are you sure you want to delete your account?')
        if (!confirmDelete) {
            return;
        }
        else {
            let userData = JSON.parse(localStorage.getItem('userData'))
            
            let data = userData? userData : {}
            let {id} = data || {}
            let res = await axios.delete(`https://backendproject-rxcq.onrender.com/user/delete/${id}`)
            console.log(res.data);
            
            if (res.data.status == false){
                alert(res.data.message)
            }
            else{
                alert(res.data.message)
                localStorage.clear();
                navigate('/')
            }
        }
    }
    return (
        <div>
            <button className='delete_account' onClick={() => deleteAcc()}>Delete acount</button>
        </div>
    )
}

export default DeleteAccount