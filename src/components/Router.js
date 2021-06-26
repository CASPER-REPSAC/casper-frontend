import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from 'components/Navigation';
import Home from 'routes/Home';
import Board from 'routes/Board';

const AppRouter = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/board">
          <Board />
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
