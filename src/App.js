import NotFound from 'components/NotFound';
import { Route, Routes as Switch } from 'react-router-dom';
import { AdminLayout, ClientLayout } from './layout';
import { PrivateRoute } from 'routes';
import AdminLogin from 'components/AdminLogin';
function App() {
  return (
    <Switch>
      <Route path="/*" element={<ClientLayout />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<PrivateRoute />}>
        <Route path="/admin/*" element={<AdminLayout />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Switch>
  );
}

export default App;
