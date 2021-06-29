import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Navigation from "components/Navigation";
import Home from "routes/Home";
import Board from "routes/Board";
import Detail from "routes/Detail";
import Lobby from "routes/Lobby";

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
        <Route exact path="/board/:category/:id" component={Detail} />

        <Route exact path="/community">
          <Redirect to="/community/lobby" />
        </Route>
        <Route exact path="/community/lobby" component={Lobby} />
        <Route exact path="/community/sos" component={Home} />
        <Route exact path="/community/sos/:id" component={Home} />
        <Route exact path="/community/rank" component={Home} />

        <Route exact path="/library" component={Home} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
