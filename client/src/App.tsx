import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { User, Home, Listing, NotFound, Auth, Profile } from "./pages";
import { Layout, AppSkeleton } from "./components";
import { useAuth } from "./store";
import { useQuery } from "@apollo/react-hooks";
import { ME } from "./graphql/queries";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const { isLoading, loadUser } = useAuth();

  // perform query for user whether user is login or not
  useQuery(ME, {
    onCompleted({ me }) {
      loadUser(me);
    },
    onError() {},
  });

  if (isLoading) {
    return <AppSkeleton />;
  }

  return (
    <>
      <Router>
        <Layout>
          <Switch>
            <Route path="/auth" exact>
              <Auth />
            </Route>
            <ProtectedRoute path="/profile" component={Profile} exact />
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/listing/:id" exact>
              <Listing />
            </Route>
            <Route path="/user/:id" exact>
              <User />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </>
  );
}

export default App;
