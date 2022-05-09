import NotFound from 'components/NotFound';
import PostCard from 'features/problem/admin/PostCard';
import Problem from 'features/problem/Problem';
import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';
import ProblemSolve from '../components/ProblemSolve';
import ContentContest from '../features/contest/info/ContentContest';
import Contest from '../features/contest/pages/Contest';
import DiscussPage from '../features/discuss/pages/DiscussPage';

export function ClientRoutes() {
  return (
    <Switch>
      <Route path="/" element={<Navigate to="/problem" />} />
      <Route path="/problem" element={<Problem />} />
      <Route path="/problem/:id" element={<ProblemSolve />} />
      <Route path="/discuss" element={<DiscussPage />} />
      <Route path="/contest" element={<Contest />} />
      <Route path="/contest/:id" element={<ContentContest />} />
      <Route path="/rank" element={<div>Rank page</div>} />
      <Route path="/upload" element={<div>upload page</div>} />
      <Route path="*" element={<NotFound />} />
    </Switch>
  );
}
