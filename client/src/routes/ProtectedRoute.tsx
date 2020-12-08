import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType;
}

export const ProtectedRoute = ({ component: Component }: PrivateRouteProps) => {
  const { user, isLoading } = useAuth();

  return (
    <Route
      render={() => {
        if (isLoading) {
          return null;
        }
        if (user && !isLoading) {
          return <Component />;
        }
        return <Redirect to="/login" />;
      }}
    />
  );
};
