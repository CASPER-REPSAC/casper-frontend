import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from 'components/Navigation';
import Home from 'routes/Home';
import Board from 'routes/Board';
import Detail from 'routes/Detail';

const AppRouter = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/board" component={Board} />
        <Route exact path="/board/:id" component={Detail} />
        <Route exact path="/community" component={Home} />
        <Route exact path="/library" component={Home} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
