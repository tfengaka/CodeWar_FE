import NotFound from 'components/NotFound';
import Blog from 'features/blog/Blog';
import CourseDetail from 'features/course/client/CourseDetail';
import CoursesList from 'features/course/client/CoursesList';
import Problem from 'features/problem/Problem';
import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';
import ProblemSolve from '../components/ProblemSolve';
import ContentContest from '../features/contest/info/ContentContest';
import Contest from '../features/contest/pages/Contest';

export function ClientRoutes() {
  return (
    <Switch>
      <Route path="/" element={<Navigate to="/problem" />} />
      <Route path="/problem" element={<Problem />} />
      <Route path="/problem/:id" element={<ProblemSolve />} />
      <Route path="/contest" element={<Contest />} />
      <Route path="/contest/:id" element={<ContentContest />} />
      <Route path="/rank" element={<div>Rank page</div>} />
      <Route path="/blog" element={<Blog />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/course" element={<CoursesList />} />
      <Route path="/course/:id" element={<CourseDetail />} />
    </Switch>
  );
}
