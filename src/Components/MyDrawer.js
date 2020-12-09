import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import axios from "axios";
import SimpleBottomNavigation from "./BottomNav";
import TopNav from "./TopNav";
import { Divider } from "@material-ui/core";
import { API } from "../API/api";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const MyDrawer = ({ rot, setRot, setCategory, nowFetch, data, setData }) => {
  const [cate, setCate] = useState();
  const matches = useMediaQuery("(min-width:1000px)");
  const getContentData = async (category) => {
    setData(await nowFetch(category));
  };

  useEffect(() => {
    const getCategory = async () => {
      await axios
        .get(`${API}/category`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("t")}`,
          },
        })
        .then((response) => {
          setCate(response);
        });
    };
    getCategory();
  }, []);

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <h2 style={{ margin: 15 }}>Trending tags</h2>
        <hr />
        {cate &&
          cate.data.map((text, index) => (
            <ListItem
              onClick={() => {
                setCategory(text.category);
                getContentData(text.category);
                setRot((prev) => prev + 360);
              }}
              button
              key={text.category}
            >
              <ListItemText primary={`#${text.category}`} />
              <p>{text["count(category)"]}</p>
            </ListItem>
          ))}
      </List>
    </div>
  );
  return (
    <div>
      <React.Fragment>
        <Drawer
          variant={matches ? "permanent" : "temporary"}
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
        <Drawer
          variant={matches ? "permanent" : "temporary"}
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
      {!matches && <SimpleBottomNavigation toggleDrawer={toggleDrawer} />}
    </div>
  );
};

export default MyDrawer;
