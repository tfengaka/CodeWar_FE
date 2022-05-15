import NotFound from 'components/NotFound';
import CreateProblem from 'features/problem/admin/CreateProblem';
import ListProblem from 'features/problem/admin/ListProblem';
import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';
import CreateContest from '../features/contest/admin/pages/CreateContest';
import ListContest from '../features/contest/admin/pages/ListContest';

export function AdminRoutes() {
  return (
    <Switch>
      <Route index element={<Navigate to="/admin/problems" />} />
      <Route path="problems">
        <Route index element={<ListProblem />} />
        <Route path="create" element={<CreateProblem />} />
      </Route>
      <Route path="contest">
        <Route index element={<ListContest />} />
        <Route path="create" element={<CreateContest />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Switch>
  );
}
