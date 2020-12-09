import React, { Profiler } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import App from "../App";
import Leaderboard from "../Components/Leaderboard";
import Login from "../Components/Login";
import Main, { location } from "../Components/Main";
import Profile from "../Components/Profile";
import Signup from "../Components/Signup";
import Trending from "../Components/Trending";

import GlobalStates from "../States/GlobalStates";

const Routes = () => (
  <GlobalStates>
    <Router>
      <Switch>
        <Route path={`/`} exact component={Main} />
        <Route path={`/Signup`} exact component={Signup} />
        <Route path={`/App`} exact component={App} />
        {/* <Route path={`/Main`} component={Main} /> */}
        <Route path={`/Leaderboard`} component={Leaderboard} />
        <Route path={`/Profile/:user`} component={Profile} />
        <Route path={`/Trending`} component={Trending} />
      </Switch>
    </Router>
  </GlobalStates>
);

export default Routes;
