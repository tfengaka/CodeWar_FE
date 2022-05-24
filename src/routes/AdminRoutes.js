import NotFound from 'components/NotFound';
import BlogAdmin from 'features/blog/pages/admin/BlogAdmin';
import BlogDetail from 'features/blog/pages/BlogDetail';
import CreateBlog from 'features/blog/pages/CreateBlog';
import EditBlog from 'features/blog/pages/EditBlog';
import CreateChallenge from 'features/challenge/admin/pages/CreateChallenge';
import ChallengesList from 'features/challenge/client/ChallengesList';
import ListQuestionContest from 'features/contest/admin/ListQuestionContest';
import CreateCourse from 'features/course/admin/CreateCourse';
import ListConcepts from 'features/course/admin/ListConcepts';
import ListCourse from 'features/course/admin/ListCourse';
import CreateExercise from 'features/problem/admin/CreateExercise';
import ListExercise from 'features/problem/admin/ListExercise';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';
import CreateContest from '../features/contest/admin/CreateContest';
import ListContest from '../features/contest/admin/ListContest';

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
      <Route path="course">
        <Route index element={<ListCourse />} />
        <Route path=":id">
          <Route index element={<ListConcepts />} />
          <Route path="edit" element={<CreateCourse />} />
        </Route>
        <Route path="create" element={<CreateCourse />} />
      </Route>

      <Route path="challenge">
        <Route index element={<ChallengesList isChallengesList={true} />} />
        <Route path="create" element={<CreateChallenge />} />
        <Route path="update" element={<CreateChallenge />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Switch>
  );
}
