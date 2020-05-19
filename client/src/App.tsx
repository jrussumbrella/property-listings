import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { User, Home, NotFound } from "./pages";
import { Layout } from "./components";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Switch>
            <Route path="/user/:id" exact>
              <User />
            </Route>
            <Route path="/" exact>
              <Home />
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
