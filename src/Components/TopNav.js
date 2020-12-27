import React, { useContext, useEffect, useState } from "react";
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
import { useHistory } from "react-router-dom";
import MyDrawer from "./MyDrawer";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

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
  logged: {
    textAlign: "center",
  },
}));

export default function TopNav({
  children,
  title = "Pixi - mesh",
  disableBottom = false,
  showBack = false,
  location = `/Profile`,
}) {
  const history = useHistory();
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
    userDetails,
    setUserDetails,
  ] = useContext(Context);
  const [logged, setLogged] = useState("");
  useEffect(() => {
    if (localStorage.getItem("t") !== "logged out")
      Login(localStorage.getItem("t"));
    if (auth === 401) setLogged("Not Logged In");
  }, []);
  const Login = (response) => {
    axios
      .post(
        `${API}/login`,
        {},
        {
          headers: {
            Authorization: `Bearer ${response}`,
          },
        }
      )
      .then((res) => {
        if (localStorage.getItem("t") === "logged out") setLogged("Logged In");
        else setLogged("");
        localStorage.setItem("t", response);
        setAuth(200);
        setShowModal(false);
        setTimeout(() => {
          setLogged("");
        }, 3000);
        setUserDetails(res.data);
        console.log(res.data.newUser);
        if (res.data.newUser === "true") {
          history.push("/ProfileSetup");
        }
      });
  };
  const responseGoogle = (response) => {
    setLogged("Logged In");
    Login(response.tokenObj.id_token);
  };
  const responseGoogleLogout = () => {
    setAuth(401);
    localStorage.setItem("t", "logged out");
    setShowModal(true);
    setUserDetails();
  };
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.root} position="fixed">
        <Toolbar>
          {showBack && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => {
                history.goBack();
              }}
            >
              <KeyboardBackspaceIcon />
            </IconButton>
          )}
          {/* <MyDrawer /> */}
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {auth === 401 ? (
            <GoogleLogin
              clientId="736304931891-s9bh54hflv1r8upcrd0hokk79p80s5us.apps.googleusercontent.com"
              buttonText="Login/Sign Up"
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
        <div
          className={classes.logged}
          style={auth === 200 ? { background: "green" } : { background: "red" }}
        >
          {logged}
        </div>
      </AppBar>
      <div className={classes.offsetTop}>{children}</div>
      {!disableBottom && <BottomNav />}
    </>
  );
}
