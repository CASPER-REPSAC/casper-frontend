import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "styles/main.scss";

import Navigation from "components/navigation/Navigation";
import Footer from "components/footer/Footer";

import Home from "components/home/Home";
import Board from "components/board/Board";
import PostDetail from "components/board/PostDetail";

import CommunityNav from "./community/CommunityNav";
import Lobby from "components/community/lobby/Lobby";
import Sos from "components/community/sos/Sos";
import SosDetail from "components/community/sos/SosDetail";
import Rank from "components/community/rank/Rank";

import Libaray from "components/library/Libarary";

import Login from "components/account/Login";
import GoogleCallback from "./account/GoogleCallback";
import Logout from "./account/Logout";

import { TerminalApp } from "components/extern/terminal/TerminalApp";
import ChessApp from "components/extern/chess/ChessApp";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/terminal" component={TerminalApp} />
          <Route exact path="/chess" component={ChessApp} />

          <Route path="/board">
            <Route exact path="/board">
              <Redirect to="/board/notice" />
            </Route>
            <Navigation />
            <Route exact path="/board/notice" component={Board} />
            <Route exact path="/board/free" component={Board} />
            <Route exact path="/board/:category/:id" component={PostDetail} />
            <Footer />
          </Route>

          <Route path="/community">
            <Route exact path="/community">
              <Redirect to="/community/lobby" />
            </Route>
            <Navigation />
            <CommunityNav />
            <Route exact path="/community/lobby" component={Lobby} />
            <Route exact path="/community/sos" component={Sos} />
            <Route exact path="/community/sos/:id" component={SosDetail} />
            <Route exact path="/community/rank" component={Rank} />
            <Footer />
          </Route>

          <Route exact path="/library">
            <Navigation />
            <Route exact path="/library" component={Libaray} />
            <Footer />
          </Route>

          <Route exact path="/account">
            <Navigation />
            <Route exact path="/account/login" component={Login} />
            <Route
              exact
              path="/account/google/callback"
              component={GoogleCallback}
            />
            <Route exact path="/account/logout" component={Logout} />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
