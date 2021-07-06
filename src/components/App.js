import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

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

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/board">
            <Redirect to="/board/notice" />
          </Route>
          <Route exact path="/board/notice" component={Board} />
          <Route exact path="/board/free" component={Board} />
          <Route exact path="/board/:category/:id" component={PostDetail} />

          <Route path="/community">
            <Route exact path="/community">
              <Redirect to="/community/lobby" />
            </Route>
            <CommunityNav />
            <Route exact path="/community/lobby" component={Lobby} />
            <Route exact path="/community/sos" component={Sos} />
            <Route exact path="/community/sos/:id" component={SosDetail} />
            <Route exact path="/community/rank" component={Rank} />
          </Route>

          <Route exact path="/library" component={Libaray} />

          <Route exact path="/account/login" component={Login} />
          <Route
            exact
            path="/account/google/callback"
            component={GoogleCallback}
          />
          <Route exact path="/account/logout" component={Logout} />
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;
