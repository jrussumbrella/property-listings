import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { User, Home, Listing, NotFound, Auth } from "./pages";
import { Layout } from "./components";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Switch>
            <Route path="/auth" exact>
              <Auth />
            </Route>
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
