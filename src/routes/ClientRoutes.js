import NotFound from 'components/NotFound';
import BlogDetail from 'features/blog/pages/BlogDetail';
import BlogClient from 'features/blog/pages/client/BlogClient';
import CreateBlog from 'features/blog/pages/CreateBlog';
import CompetitionCountDown from 'features/contest/client/CountDown';
import CourseDetail from 'features/course/client/CourseDetail';
import CoursesList from 'features/course/client/CoursesList';
import Problem from 'features/problem/Problem';
import Rank from 'features/rank/Rank';
import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';
import ProblemSolve from '../components/ProblemSolve';
import ContentContest from '../features/contest/client/ContentContest';
import Contest from '../features/contest/client/Contest';

export function ClientRoutes() {
  return (
    <Switch>
      <Route path="/" element={<Navigate to="/course" />} />
      <Route path="/course">
        <Route index element={<CoursesList />} />
        <Route path=":id" element={<CourseDetail />} />
      </Route>
      <Route path="/problem">
        <Route index element={<Problem />} />
        <Route path=":id" element={<ProblemSolve />} />
      </Route>

      <Route path="contest">
        <Route index element={<Contest />} />
        <Route path=":id">
          <Route index element={<ContentContest />} />
          <Route path="competition" element={<CompetitionCountDown />} />
        </Route>
      </Route>

      <Route path="/blog">
        <Route index element={<BlogClient />} />
        <Route path=":id" element={<BlogDetail />} />
        <Route path="create" element={<CreateBlog />} />
      </Route>

      <Route path="/rank" element={<Rank />} />

      <Route path="*" element={<NotFound />} />
    </Switch>
  );
}
