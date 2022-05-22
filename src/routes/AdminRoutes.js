import NotFound from 'components/NotFound';
import BlogAdmin from 'features/blog/pages/admin/BlogAdmin';
import BlogDetail from 'features/blog/pages/BlogDetail';
import CreateBlog from 'features/blog/pages/CreateBlog';
import EditBlog from 'features/blog/pages/EditBlog';
import ListQuestionContest from 'features/contest/admin/pages/ListQuestionContest';
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
        <Route path=":id">
          <Route index element={<ListQuestionContest />} />
          <Route path="problems/update">
            <Route index element={<CreateExercise />} />
          </Route>
          <Route path="problems/create">
            <Route index element={<CreateExercise />} />
          </Route>
        </Route>
        <Route path="create" element={<CreateContest />} />
      </Route>
      <Route path="blog">
        <Route index element={<BlogAdmin />} />
        <Route path=":slug">
          <Route index element={<BlogDetail />} />
          <Route path="edit" element={<EditBlog />} />
        </Route>
        <Route path="create" element={<CreateBlog />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Switch>
  );
}
