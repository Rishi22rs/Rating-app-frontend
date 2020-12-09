import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { GoogleLogin, GoogleLogout } from "react-google-login";

import BottomNav from "./BottomNav";
import { Context } from "../States/GlobalStates";
import { API } from "../API/api";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "#42CCC9",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  offsetTop: {
    marginTop: 70,
  },
}));

export default function TopNav({ children, title = "Pixi - mesh" }) {
  const [
    category,
    setCategory,
    data,
    setData,
    rot,
    setRot,
    showModal,
    setShowModal,
    auth,
    setAuth,
  ] = useContext(Context);
  const responseGoogle = (response) => {
    console.log(response.tokenObj.id_token);
    localStorage.setItem("t", response.tokenObj.id_token);
    setAuth(200);
    axios
      .post(
        `${API}/login`,
        {},
        {
          headers: {
            Authorization: `Bearer ${response.tokenObj.id_token}`,
          },
        }
      )
      .then((res) => console.log(res));
  };
  const responseGoogleLogout = () => {
    localStorage.setItem("t", "logged out");
    setAuth(401);
  };
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.root} position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {/* <MenuIcon /> */}
          {auth === 401 ? (
            <GoogleLogin
              clientId="736304931891-s9bh54hflv1r8upcrd0hokk79p80s5us.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            />
          ) : (
            <GoogleLogout
              clientId="736304931891-s9bh54hflv1r8upcrd0hokk79p80s5us.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={responseGoogleLogout}
            ></GoogleLogout>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.offsetTop}>{children}</div>
      <BottomNav />
    </>
  );
}
