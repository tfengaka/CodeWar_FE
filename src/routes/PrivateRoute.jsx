<<<<<<< Updated upstream
import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoute() {
  // const user = useSelector((state) => state.auth.user);
  const isAuth = true;
  return isAuth ? <Outlet /> : <Navigate to='/admin/login' />;
}
=======
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
>>>>>>> Stashed changes
