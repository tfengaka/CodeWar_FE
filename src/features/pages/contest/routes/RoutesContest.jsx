import NotFound from 'components/NotFound';
import Problem from 'features/pages/problem/Problem';
import React from 'react';
import { Route, Routes as Switch, useLocation } from 'react-router-dom';

import Contest from '../Contest';

export default function RoutesContest() {
  const pathName = useLocation();
  console.log(pathName);
  return (
    <div>
      <Contest />
      <div>
        <Switch>
          <Route path='ND' element={<Contest />}></Route>
        </Switch>
      </div>
    </div>
  );
}
