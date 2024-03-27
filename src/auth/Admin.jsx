import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/ContextProvider';

const Admin = () => {
    const { TypeUtilisateur } = useContext(UserContext);
    return (
        TypeUtilisateur == 3 ? <Outlet /> : <Navigate to="/login" />
    )
  
}

export default Admin