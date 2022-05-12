import LoginPage from 'features/auth/pages/LoginPage';
import { useAuth } from 'hooks/useAuth';
import * as React from 'react';
import { Outlet } from 'react-router-dom';

export function PrivateRoute() {
  const { user, isLogged } = useAuth();
  const isAdmin = user && user.role === 'admin';
  return isLogged && isAdmin ? <Outlet /> : <LoginPage />;
}
