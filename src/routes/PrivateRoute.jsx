import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoute() {
  // const user = useSelector((state) => state.auth.user);
  const isAuth = true;
  return isAuth ? <Outlet /> : <Navigate to='/admin/login' />;
}
