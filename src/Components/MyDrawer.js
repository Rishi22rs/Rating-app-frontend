import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import BarChartIcon from "@material-ui/icons/BarChart";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useHistory } from "react-router-dom";
import GoogleAuth from "../Auth/GoogleAuth";

const useStyles = makeStyles({
  main: {},
  list: {
    marginTop: "60px",
    width: 350,
  },
  fullList: {
    width: "auto",
  },
});

const icons = [
  <HomeIcon />,
  <WhatshotIcon />,
  <AddCircleIcon />,
  <BarChartIcon />,
];

const links = ["", "trending", "AddPost", "Leaderboard"];

const TemporaryDrawer = ({ state, setState, toggleDrawer }) => {
  const classes = useStyles();

  const history = useHistory();

  const draw = window.innerWidth > 1000 ? "permanent" : "temporary";

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Voting", "Trending", "Upload", "Leaderboard"].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              history.push(`/${links[index]}`);
            }}
          >
            <ListItemIcon>{icons[index]}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div key={"left"} className={classes.main}>
      <Drawer
        variant={draw}
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
        <GoogleAuth />
      </Drawer>
    </div>
  );
};

export default TemporaryDrawer;
