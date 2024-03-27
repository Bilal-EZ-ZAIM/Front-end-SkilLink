import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/ContextProvider';

const AuthLoginRegester = () => {
    const { isAuthenticated } = useContext(UserContext);


    return (

        !isAuthenticated  ? <Outlet /> : <Navigate to="*" />
    )
}

export default AuthLoginRegester