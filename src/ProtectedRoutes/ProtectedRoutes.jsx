import React from 'react';
import getToken from '../auth/getToken';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes() {
    let token  = getToken()
  
    return token ? <Outlet /> : <Navigate to="/login" replace />;
}
export default ProtectedRoutes;
