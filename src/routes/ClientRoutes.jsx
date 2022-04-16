import NotFound from 'components/NotFound';
import Coding from 'features/pages/problem/Coding';
import Problem from 'features/pages/problem/Problem';
import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';

import Contest from '../features/contest/pages/Contest';
import ContentContest from '../features/contest/info/ContentContest';

export function ClientRoutes() {
  return (
    <Switch>
      <Route path='/' element={<Navigate to='/problem' />} />
      <Route path='/problem' element={<Problem />} />
      <Route path='/problem/:slug' element={<Coding />} />
      <Route path='/contest' element={<Contest />} />
      {/* <Route path='/contest/:slug.:id.html' element={<ContentContest />} /> */}
      <Route path='/rank' element={<div>Rank page</div>} />
      <Route path='/upload' element={<div>upload page</div>} />
      <Route path='*' element={<NotFound />} />
    </Switch>
  );
}
