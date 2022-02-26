import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const user = { isLoggedIn: false };
  return user && user.isLoggedIn;
};

export function PrivateRoute() {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/admin/login" />;
}
