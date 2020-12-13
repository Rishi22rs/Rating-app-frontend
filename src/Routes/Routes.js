import React, { Profiler } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import App from "../App";
import AddPost from "../Components/AddPost";
import ImgModal from "../Components/ImgModal";
import Leaderboard from "../Components/Leaderboard";
import Login from "../Components/Login";
import Main from "../Components/Main";
import NewUserSetup from "../Components/NewUserSetup";
import Profile from "../Components/Profile";
import Signup from "../Components/Signup";
import Trending from "../Components/Trending";

import GlobalStates from "../States/GlobalStates";

const Routes = () => (
  <GlobalStates>
    <Router>
      <Switch>
        <Route path={`/`} exact component={Main} />
        <Route path={`/App`} exact component={App} />
        {/* <Route path={`/Main`} component={Main} /> */}
        <Route path={`/Leaderboard`} component={Leaderboard} />
        <Route path={`/Profile/:user`} component={Profile} />
        <Route path={`/Trending`} component={Trending} />
        <Route path={`/ProfileSetup`} component={NewUserSetup} />
        <Route path={`/AddPost`} component={AddPost} />
      </Switch>
      <Route path={`/img/:id`} component={ImgModal} />
    </Router>
  </GlobalStates>
);

export default Routes;
