import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';
export function ClientRoutes() {
  return (
    <Switch>
      <Route path="/" element={<Navigate to="/problem" />} />
      <Route path="/problem" element={<div>Problem page</div>} />
      <Route path="/contest" element={<div>Contest page</div>} />
      <Route path="/rank" element={<div>Rank page</div>} />
      <Route path="/upload" element={<div>upload page</div>} />
    </Switch>
  );
}
