import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from 'routes/Home';
import Navigation from 'components/Navigation';

const AppRouter = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/board">
          <Home />
        </Route>

        <Route exact path="/community">
          <Home />
        </Route>

        <Route exact path="/library">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
