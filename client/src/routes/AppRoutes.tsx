import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import Home from 'pages/Home';
import Listing from 'pages/Listing';
import Listings from 'pages/Listings';
import MyProperties from 'pages/MyProperties';
import MyFavorites from 'pages/MyFavorites';
import Profile from 'pages/Profile';
import User from 'pages/User';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import EmailConfirmation from 'pages/EmailConfirmation';
import ForgotPassword from 'pages/ForgotPassword';
import NotFound from 'pages/NotFound';
import CreateListing from 'pages/CreateListing';
import ResetPassword from 'pages/ResetPassword';
import { ScrollToTop } from './ScrollTop';
import { ProtectedRoute } from './ProtectedRoute';

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
          <Route path="/forgot-password" exact>
            <ForgotPassword />
          </Route>
          <Route path="/reset-password/:token" exact>
            <ResetPassword />
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
