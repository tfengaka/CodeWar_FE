import React from 'react';
import { ClientRoutes } from 'routes';
import Navigation from '../components/Navigation';

export function ClientLayout() {
  return (
    <>
      <Navigation />
      <div className="container">
        <div className="main-content">
          <ClientRoutes />
        </div>
      </div>
    </>
  );
}
