import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import AppSkeleton from 'components/AppSkeleton';
import { useAuth } from 'globalState';
import { ME } from 'graphql/queries';
import AppRoutes from 'routes/AppRoutes';

const App = (): JSX.Element => {
  const { isLoading, loadUser, setAuthError } = useAuth();

  // perform query for user whether user is login or not
  useQuery(ME, {
    onCompleted({ me }) {
      loadUser(me);
    },
    onError() {
      setAuthError();
    },
  });

  if (isLoading) {
    return <AppSkeleton />;
  }

  return <AppRoutes />;
};

export default App;
