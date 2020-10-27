import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Button from "@material-ui/core/Button";
import Dropdown from "./Dropdown";
import BottomNav from "./BottomNav";

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
          <MenuIcon />
        </Toolbar>
      </AppBar>
      <div className={classes.offsetTop}>{children}</div>
      <BottomNav />
    </>
  );
}
