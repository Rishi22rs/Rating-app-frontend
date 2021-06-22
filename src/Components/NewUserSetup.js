import React, { useState, useContext, useEffect } from "react";
import TopNav from "./TopNav";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import axios from "axios";
import { API } from "../API/api";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Context } from "../States/GlobalStates";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 20px 0px 20px",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const NewUserSetup = () => {
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
    showLoader,
    setShowLoader,
  ] = useContext(Context);
  const classes = useStyles();
  const location = useLocation();
  const [detail, setDetail] = useState({
    username: location.state ? location.state[0].username : "",
    bio: location.state ? location.state[0].bio : "",
    dob: location.state ? location.state[0].dob : "",
  });
  const [open, setOpen] = useState(false);

  console.log("data", location.state);

  let user_id = userDetails && userDetails[0].user_id;

  const handleInput = (e) => {
    setDetail((prevState) => ({
      ...prevState,
      user_id: user_id,
    }));
    const { name, value } = e.target;
    setDetail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    axios
      .post(`${API}/userDetails`, detail, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("t")}`,
        },
      })
      .then((res) => {
        setOpen(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <TopNav disableBottom={true} title="Setup Profile" showBack={true}>
        <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
          <TextField
            name="username"
            className={classes.root}
            required
            id="standard-required"
            label="Username"
            variant="outlined"
            onChange={(e) => handleInput(e)}
            value={detail && detail.username}
          />
          <TextField
            name="bio"
            className={classes.root}
            id="outlined-multiline-static"
            label="Bio"
            multiline
            rows={4}
            variant="outlined"
            onChange={(e) => handleInput(e)}
            value={detail && detail.bio}
          />
          <TextField
            name="dob"
            id="date"
            label="Birthday"
            type="date"
            className={classes.root}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => handleInput(e)}
            value={detail && detail.dob}
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            className={classes.root}
          >
            Save
          </Button>
        </form>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Profile updated...
          </Alert>
        </Snackbar>
      </TopNav>
    </div>
  );
};

export default NewUserSetup;
