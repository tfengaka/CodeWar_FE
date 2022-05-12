import NotFound from 'components/NotFound';
import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';
import CreateContest from '../features/contest/admin/pages/CreateContest';

export function AdminRoutes() {
  return (
    <Switch>
      <Route index element={<Navigate to="/admin/problems" />} />
      <Route path="problems">
        <Route index element={<div>Admin Problem</div>} />
        <Route path="create" element={<div>Create Problem</div>} />
      </Route>
      <Route path="contest">
        <Route index element={<div>admin contest</div>} />
        <Route path="create" element={<CreateContest />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Switch>
  );
}
