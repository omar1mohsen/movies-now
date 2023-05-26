import React from 'react'
import { UserAuth } from './authContext/authContext'
import { Navigate } from 'react-router-dom'


const ProtectRoute = ({children}) => {
    const {user} = UserAuth()
    return !user? <Navigate to="/"/> : children;
}

export default ProtectRoute