import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useAuth } from 'contexts';
import { ME } from 'graphql/queries';
import AppRoutes from 'routes/AppRoutes';

const App = (): JSX.Element => {
  const { loadUser, setAuthError } = useAuth();

  // perform query for user whether user is login or not
  useQuery(ME, {
    onCompleted({ me }) {
      loadUser(me);
    },
    onError() {
      setAuthError();
    },
  });

  return <AppRoutes />;
};

export default App;
