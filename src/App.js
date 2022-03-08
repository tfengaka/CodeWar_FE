import NotFound from 'components/NotFound';
import { Route, Routes as Switch } from 'react-router-dom';
import { AdminLayout, ClientLayout } from './layout';
import { PrivateRoute } from 'routes';
import LoginPage from 'features/auth/admin/page/LoginPage';
function App() {
  return (
    <Switch>
      <Route path="/*" element={<ClientLayout />} />
      <Route path="/admin/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/admin/*" element={<AdminLayout />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Switch>
  );
}

export default App;
