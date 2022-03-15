import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import LoginPage from 'features/auth/admin/page/LoginPage';
import { Route, Routes as Switch } from 'react-router-dom';
import { PrivateRoute } from 'routes';
import { AdminLayout, ClientLayout } from './layout';

const httpLink = new HttpLink({ uri: 'http://localhost:8080/v1/graphql' });
const authLink = new ApolloLink((operation, forward) => {
  //* Retrieve the authorization token from redux store
  const token = '';
  //* Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });
  //* Call the next link in the middleware chain.
  return forward(operation);
});
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: 'http://localhost:8080/v1/graphql',
//   }),
//   cache: new InMemoryCache(),
// });

function App() {
  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route path='/*' element={<ClientLayout />} />
        <Route path='/admin/login' element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path='/admin/*' element={<AdminLayout />} />
        </Route>
      </Switch>
    </ApolloProvider>
  );
}

export default App;
