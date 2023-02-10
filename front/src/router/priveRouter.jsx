import React, { useContext } from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom'

import AuthContext from '@context/authContext';

const PriveRoute = () => {

    const {userLoad} = useContext(AuthContext);

    return userLoad ? <Outlet /> : <Navigate to="/admin" />
}

const AuthRoute = () =>{
    const {userLoad} = useContext(AuthContext);
    
    return userLoad ? <Navigate to="/admin/settings" /> : <Outlet /> 
}

const Default = () =>{
    
    return  <Navigate to="/location" />
}

export {
    PriveRoute,
    AuthRoute,
    Default
}