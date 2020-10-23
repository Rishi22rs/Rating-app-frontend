import { makeStyles } from "@material-ui/core";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import BG from "../Graphics/login_bg.jpg";

import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const useStyles = makeStyles((theme) => ({
  LoginContainer: {
    position: "fixed",
    backgroundImage: `url(${BG})`,
    height: "100%",
    width: "100%",
    backgroundSize: "100% 100%",
    boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.5)",
  },
  input_container: {
    maxWidth: 380,
    width: "80%",
    height: 55,
    backgroundColor: "white",
    opacity: 0.5,
    margin: "10px 0",
    borderRadius: 55,
    display: "grid",
    gridTemplateColumns: "15% 85%",
    padding: "0.3rem .4rem",
  },
  i: {
    textAlign: "center",
    marginTop: 10,
  },
  logo: {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    top: 40,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 60,
  },
  input: {
    top: 0,
    color: "black",
    border: "none",
    marginBottom: "30px",
    padding: 10,
    borderRadius: 20,
    outline: "none",
  },
  btn: {
    border: "none",
    backgroundColor: "#F26130",
    borderRadius: 55,
    height: 55,
    maxWidth: 380,
    width: "80%",
    marginTop: 10,
    opacity: 0.7,
  },
  linksContainer: {
    marginTop: 70,
  },
  links: {
    padding: 40,
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.LoginContainer}>
      <div className={classes.logo}>
        <img src="https://img.icons8.com/color/144/000000/digg.png" />
      </div>
      <form className={classes.form}>
        <div className={classes.input_container}>
          <i className={classes.i}>
            <PersonIcon />
          </i>
          <input type="text" placeholder="Username" className={classes.input} />
        </div>
        <div className={classes.input_container}>
          <i className={classes.i}>
            <VpnKeyIcon />
          </i>
          <input
            type="password"
            placeholder="Password"
            className={classes.input}
          />
        </div>
        <button className={classes.btn} onClick={() => history.push("/main")}>
          Get Started
        </button>
        <div className={classes.linksContainer}>
          <Link className={classes.links}>Create Account</Link>
          <Link className={classes.links}>Need Help</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
