import NotFound from 'components/NotFound';
import ListQuestionContest from 'features/contest/admin/pages/ListQuestionContest';
import CreateProblem from 'features/problem/admin/CreateProblem';
import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';
import CreateContest from '../features/contest/admin/pages/CreateContest';
import ListContest from '../features/contest/admin/pages/ListContest';

export function AdminRoutes() {
  return (
    <Switch>
      <Route index element={<Navigate to="/admin/problems" />} />
      <Route path="problems">
        <Route index element={<div>Admin Problem</div>} />
        <Route path="create" element={<CreateProblem />} />
      </Route>
      <Route path="contest">
        <Route index element={<ListContest />} />
        <Route path="contest/:id" element={<ListQuestionContest />} />
        <Route path="contest/:id/problems" element={<CreateProblem />} />
        <Route path="create" element={<CreateContest />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Switch>
  );
}
