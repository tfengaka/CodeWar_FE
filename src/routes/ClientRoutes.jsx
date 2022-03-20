import NotFound from 'components/NotFound';
import Problem from 'features/problem/pages/Problem';
import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';

import Contest from '../features/contest/pages/Contest';

export function ClientRoutes() {
  return (
    <Switch>
      <Route path='/' element={<Navigate to='/problem' />} />
      <Route path='/problem' element={<Problem />} />
      <Route path='/contest' element={<Contest />} />
      <Route path='/rank' element={<div>Rank page</div>} />
      <Route path='/upload' element={<div>upload page</div>} />
      <Route path='*' element={<NotFound />} />
    </Switch>
  );
}
