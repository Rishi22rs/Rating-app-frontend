import React, { Profiler } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "../App";
import Leaderboard from "../Components/Leaderboard";
import Login from "../Components/Login";
import Main from "../Components/Main";
import Profile from "../Components/Profile";

const Routes = () => (
  <Router>
    <Route path={`/`} exact component={Login} />
    <Route path={`/App`} exact component={App} />
    <Route path={`/Main`} component={Main} />
    <Route path={`/Leaderboard`} component={Leaderboard} />
    <Route path={`/Profile/:user`} component={Profile} />
  </Router>
);

export default Routes;
