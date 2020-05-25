import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "../../store";

interface PrivateRouteProps extends RouteProps {
  component: any;
}

export const ProtectedRoute = ({
  component: Component,
  ...rest
}: PrivateRouteProps) => {
  const { user, isLoading } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user && !isLoading) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to="/auth" />;
        }
      }}
    />
  );
};
