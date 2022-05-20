import NotFound from 'components/NotFound';
<<<<<<< HEAD
import BlogAdmin from 'features/blog/pages/admin/BlogAdmin';
import BlogDetail from 'features/blog/pages/BlogDetail';
import CreateBlog from 'features/blog/pages/CreateBlog';
=======
import ListQuestionContest from 'features/contest/admin/pages/ListQuestionContest';
import BlogReview from 'features/blog/pages/admin/BlogReview';
import ListBlog from 'features/blog/pages/admin/ListBlog';
>>>>>>> develop
import CreateExercise from 'features/problem/admin/CreateExercise';
import ListExercise from 'features/problem/admin/ListExercise';
import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';
import CreateContest from '../features/contest/admin/pages/CreateContest';
import ListContest from '../features/contest/admin/pages/ListContest';

export function AdminRoutes() {
  return (
    <Switch>
      <Route index element={<Navigate to="/admin/problems" />} />
      <Route path="problems">
        <Route index element={<ListExercise />} />
        <Route path="create" element={<CreateExercise />} />
        <Route path="update" element={<CreateExercise />} />
      </Route>
      <Route path="contest">
        <Route index element={<ListContest />} />
        <Route path=":id" element={<ListQuestionContest />} />
        <Route path=":id/problems/:id" element={<CreateExercise />} />
        <Route path="create" element={<CreateContest />} />
      </Route>
      <Route path="blog">
        <Route index element={<BlogAdmin />} />
        <Route path=":slug" element={<BlogDetail />} />
        <Route path="create" element={<CreateBlog />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Switch>
  );
}
