import { makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import BG from "../Graphics/signup_bg.jpg";
import axios from "axios";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

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
  empty: {
    color: "#F26130",
  },
}));

const Signup = () => {
  const classes = useStyles();
  const history = useHistory();
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      inputData.username == "" ||
      inputData.email == "" ||
      inputData.password == ""
    ) {
      setIsEmpty(true);
      setIsLoading(false);
    }
    console.log(inputData);
  };

  useEffect(() => {
    if (localStorage.getItem("t")) {
      history.push("/main");
    }
  }, []);

  return (
    <div className={classes.LoginContainer}>
      <div className={classes.logo}>
        <img src="https://img.icons8.com/color/144/000000/digg.png" />
      </div>
      <form className={classes.form}>
        {isEmpty && <p className={classes.empty}>*Fields are empty.</p>}
        <div className={classes.input_container}>
          <i className={classes.i}>
            <PersonIcon />
          </i>
          <input
            type="text"
            placeholder="Username"
            className={classes.input}
            onChange={(e) => {
              setInputData({ ...inputData, username: e.target.value });
              setIsEmpty(false);
            }}
          />
        </div>
        <div className={classes.input_container}>
          <i className={classes.i}>
            <AlternateEmailIcon />
          </i>
          <input
            type="email"
            placeholder="Email"
            className={classes.input}
            onChange={(e) => {
              setInputData({ ...inputData, email: e.target.value });
              setIsEmpty(false);
            }}
          />
        </div>
        <div className={classes.input_container}>
          <i className={classes.i}>
            <VpnKeyIcon />
          </i>
          <input
            type="password"
            placeholder="Password"
            className={classes.input}
            onChange={(e) => {
              setInputData({ ...inputData, password: e.target.value });
              setIsEmpty(false);
            }}
          />
        </div>
        <button className={classes.btn} onClick={(e) => handleLogin(e)}>
          {!isLoading ? (
            "Get Started"
          ) : (
            <Loader type="Puff" color="black" height={50} width={100} />
          )}
        </button>
        <div className={classes.linksContainer}>
          <Link className={classes.links} to="/">
            Already a user
          </Link>
          <Link className={classes.links}>Need Help</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
