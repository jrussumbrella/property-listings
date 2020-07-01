import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  User,
  Home,
  Listing,
  NotFound,
  SignIn,
  SignUp,
  Profile,
  MyProperties,
  MyFavorites,
  EmailConfirmation,
  CreateListing,
  Listings,
} from "./pages";
import { Layout, AppSkeleton } from "./components";
import { useAuth } from "./store";
import { useQuery } from "@apollo/react-hooks";
import { ME } from "./graphql/queries";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
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

  return (
    <>
      <Router>
        <Layout>
          <Switch>
            <Route path="/auth" exact>
              <SignIn />
            </Route>
            <Route path="/auth/sign-up" exact>
              <SignUp />
            </Route>
            <Route path="/email-confirmation/:token" exact>
              <EmailConfirmation />
            </Route>
            <ProtectedRoute
              path="/my-properties"
              component={MyProperties}
              exact
            />
            <ProtectedRoute
              path="/my-favorites"
              component={MyFavorites}
              exact
            />
            <ProtectedRoute path="/profile" component={Profile} exact />
            <Route path="/" exact>
              <Home />
            </Route>
            <ProtectedRoute
              path="/listing/create"
              component={CreateListing}
              exact
            />
            <Route path="/listings/:search" exact>
              <Listings />
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
