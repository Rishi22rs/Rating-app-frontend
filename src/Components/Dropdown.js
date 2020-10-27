import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: { color: "black" },
}));
const Dropdown = () => {
  const classes = useStyles();
  return <div className={classes.root}>Rishi</div>;
};

export default Dropdown;
