import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/ContextProvider';

const RequierAuth = () => {

    const {  isAuthenticated } = useContext(UserContext);

    
    return (
    
        isAuthenticated  ? <Outlet /> : <Navigate to="/" />
    )
}

export default RequierAuth