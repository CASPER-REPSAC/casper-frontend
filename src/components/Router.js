import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
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
        <Route exact path="/board">
          <Redirect to="/board/notice" />
        </Route>
        <Route exact path="/board/notice" component={Board} />
        <Route exact path="/board/free" component={Board} />
        <Route exact path="/board/free/:id" component={Detail} />
        <Route exact path="/board/notice/:id" component={Detail} />
        <Route exact path="/community" component={Home} />
        <Route exact path="/library" component={Home} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
