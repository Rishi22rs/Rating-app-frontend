import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { API } from "../API/api";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "95%",
    },
  },
  flexing: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    color: "#265061",
    background: "white",
  },
  btn: {
    background: "#524365",
    color: "white",
    width: "100%",
    margin: "auto",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function InputComments({
  image_id,
  userDetails,
  setComments,
  comments,
  auth,
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [errOpen, setErrOpen] = React.useState(false);
  const addComment = () => {
    if (value.length == 0) {
      setErrOpen(true);
      return;
    }
    axios
      .post(
        `${API}/addComment`,
        {
          user_id: userDetails[0].user_id,
          image_id: image_id,
          comment: value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("t")}`,
          },
        }
      )
      .then((res) => {
        setOpen(true);
        console.log(res);
      });
    setComments([
      ...comments,
      {
        comment: value,
        name: userDetails[0].name,
      },
    ]);
    setValue("");
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setErrOpen(false);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.flexing}>
          <TextField
            onChange={handleChange}
            InputProps={{
              className: classes.input,
            }}
            id="outlined-textarea"
            disabled={auth == 200 ? false : true}
            label={auth == 200 ? "Comment" : "Login to comment"}
            placeholder="Here you go"
            multiline
            variant="outlined"
            value={value}
          />
          <Button
            disabled={auth == 200 ? false : true}
            variant="contained"
            className={classes.btn}
            onClick={addComment}
          >
            ADD
          </Button>
        </div>
      </form>
      <Snackbar open={errOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Comment field is empty!
        </Alert>
      </Snackbar>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Comment Added...
        </Alert>
      </Snackbar>
    </>
  );
}
