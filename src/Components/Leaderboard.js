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
import Loader from "react-loader-spinner";
import ObserverWrapper from "@emarketeross/simple-react-intersection-observer";
import { FixedSizeList } from "react-window";
import { API } from "../API/api";

const useStyles = makeStyles((theme) => ({
  offsetTop: {
    marginTop: 50,
    marginBottom: 50,
  },
  root: {
    width: "100%",
  },
  listItem: {
    backgroundColor: "#52AFD3",
    borderRadius: 25,
    marginBottom: 10,
    color: "white",
  },
  inline: {
    display: "inline",
  },
  container: {
    marginBottom: "65px",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function Leaderboard() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
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
    await axios
      .post(
        `${API}/leaderboard`,
        { offset },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("t")}`,
          },
        }
      )
      .then((res) => {
        console.log("pure", res.data);
        setData(res.data);
        setIsLoading(false);
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

  const Row = (x, index) => <div></div>;

  return (
    <>
      <TopNav title="Leaderboard" />
      {isLoading ? (
        <div className={classes.loader}>
          <Loader type="Puff" color="black" height={50} width={100} />
        </div>
      ) : (
        <div className={classes.container} className={classes.offsetTop}>
          <List
            height={150}
            itemCount={1000}
            itemSize={35}
            width={300}
            className={classes.root}
          >
            {data.map((x, index) => (
              <ObserverWrapper>
                <ListItem alignItems="flex-start" className={classes.listItem}>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={x.url} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${x.votes} Upvotes`}
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
              </ObserverWrapper>
            ))}
          </List>
        </div>
      )}
      <BottomNav toggleDrawer={toggleDrawer} active={3} />
    </>
  );
}
