import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';

import Contest from '../features/contestPage/Contest';
export function ClientRoutes() {
  return (
    <Switch>
      <Route path="/" element={<Navigate to="/problem" />} />
      <Route path="/problem" element={<div>Problem page</div>} />
      <Route
        path="/contest"
        element={
          <div>
            <Contest />
          </div>
        }
      />
      <Route path="/rank" element={<div>Rank page</div>} />
      <Route path="/upload" element={<div>upload page</div>} />
    </Switch>
  );
}
