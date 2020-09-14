import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import { ScrollToTop } from './ScrollTop';
import { ProtectedRoute } from './ProtectedRoute';
import CreateListing from '../features/CreateListing';
import Home from '../features/Home';
import Listing from '../features/Listing';
import Listings from '../features/Listings';
import MyProperties from '../features/MyProperties';
import MyFavorites from '../features/MyFavorites';
import EditProfile from '../features/EditProfile';
import ChangePassword from '../features/ChangePassword';
import Profile from '../features/Profile';
import User from '../features/User';
import SignIn from '../features/SignIn';
import SignUp from '../features/SignUp';
import EmailConfirmation from '../features/EmailConfirmation';
import NotFound from '../features/NotFound';

const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Switch>
          <ProtectedRoute
            path="/my-properties"
            component={MyProperties}
            exact
          />
          <ProtectedRoute path="/my-favorites" component={MyFavorites} exact />
          <ProtectedRoute path="/profile" component={Profile} exact />
          <ProtectedRoute
            path="/profile/edit-profile"
            component={EditProfile}
            exact
          />
          <ProtectedRoute
            path="/profile/change-password"
            component={ChangePassword}
            exact
          />
          <ProtectedRoute
            path="/listing/create"
            component={CreateListing}
            exact
          />
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/listing/:id" exact>
            <Listing />
          </Route>
          <Route path="/listings/:search" exact>
            <Listings />
          </Route>
          <Route path="/user/:id" exact>
            <User />
          </Route>
          <Route path="/login" exact>
            <SignIn />
          </Route>
          <Route path="/sign-up" exact>
            <SignUp />
          </Route>
          <Route path="/email-confirmation/:token" exact>
            <EmailConfirmation />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
