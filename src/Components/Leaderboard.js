import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TopNav from "./TopNav";
import axios from "axios";
import BottomNav from "./BottomNav";

import { FixedSizeList } from "react-window";

const useStyles = makeStyles((theme) => ({
  offsetTop: {
    marginTop: 50,
    marginBottom: 50,
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  container: {
    marginBottom: "65px",
  },
}));

export default function Leaderboard() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [pageOffset, setPageOffset] = useState(window.innerHeight - 250);
  let flag = false;
  useEffect(() => {
    getLeaderboard();
  }, []);

  // window.addEventListener("scroll", (event) => {
  //   console.log(window.pageYOffset, pageOffset);
  //   if (window.pageYOffset > pageOffset && !flag) {
  //     flag = true;
  //     getLeaderboard();
  //   }
  // });

  const getLeaderboard = async () => {
    console.log(offset);
    await axios
      .post(`http://localhost:6969/leaderboard`, { offset })
      .then((res) => {
        console.log("pure", res.data);
        setData(data && data.concat(res.data));
        setPageOffset(pageOffset + window.pageYOffset);
        setOffset(offset + 10);
      });
  };
  console.log(data);
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

  const Row = (x, index) => (
    <div>
      rishi
      {/* <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={x.url} />
          </ListItemAvatar>
          <ListItemText
            primary={x.votes}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {index + 1}
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" /> */}
    </div>
  );

  return (
    <>
      <TopNav title="Leaderboard" />
      <div className={classes.container} className={classes.offsetTop}>
        <FixedSizeList
          height={150}
          itemCount={1000}
          itemSize={35}
          width={300}
          className={classes.root}
        >
          {Row}
        </FixedSizeList>
      </div>
      <BottomNav toggleDrawer={toggleDrawer} active={2} />
    </>
  );
}
