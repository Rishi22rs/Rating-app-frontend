import React from "react";
import TopNav from "./TopNav";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

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

const NewUserSetup = () => {
  const classes = useStyles();
  return (
    <div>
      <TopNav disableBottom={true} title="Setup Profile" showBack={true}>
        <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
          <TextField
            className={classes.root}
            required
            id="standard-required"
            label="Username"
            variant="outlined"
          />
          <TextField
            className={classes.root}
            id="outlined-multiline-static"
            label="Bio"
            multiline
            rows={4}
            variant="outlined"
          />
          <TextField
            id="date"
            label="Birthday"
            type="date"
            className={classes.root}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant="contained" color="primary" className={classes.root}>
            Save
          </Button>
        </form>
      </TopNav>
    </div>
  );
};

export default NewUserSetup;
