import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/ContextProvider';

const Freelancer = () => {
    const { TypeUtilisateur } = useContext(UserContext);
    return (
        TypeUtilisateur == 2 ? <Outlet /> : <Navigate to="/login" />
    )
}

export default Freelancer