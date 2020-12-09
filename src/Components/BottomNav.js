import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import BarChartIcon from "@material-ui/icons/BarChart";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";
import { Context } from "../States/GlobalStates";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    width: 100 + "%",
    zIndex: 99,
    background: "#524365",
  },
  btn: {
    outline: "none",
    textDecoration: "none",
    border: "none",
    color: "#DCC3F3",
    "&$selected": {
      color: "white",
    },
  },
  selected: {},
});

export default function BottomNav({ children, active = 1 }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(active);

  const history = useHistory();

  const [
    category,
    setCategory,
    dataa,
    setDataa,
    rot,
    setRot,
    showModal,
    setShowModal,
    auth,
    setAuth,
  ] = useContext(Context);

  return (
    <>
      <div className={classes.offsetBottom}>{children}</div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          onClick={() => {
            setShowModal(false);
            history.push("/trending");
          }}
          classes={{ root: classes.btn, selected: classes.selected }}
          label="Trending"
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction
          onClick={() => {
            setShowModal(false);
            history.push(`/`);
          }}
          classes={{ root: classes.btn, selected: classes.selected }}
          label="Voting"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          onClick={() => {
            setShowModal(false);
            history.push(`/Leaderboard`);
          }}
          classes={{ root: classes.btn, selected: classes.selected }}
          label="Leaderboard"
          icon={<BarChartIcon />}
        />
        <BottomNavigationAction
          onClick={() => {
            setShowModal(false);
            history.push(`/Profile/1`);
          }}
          classes={{ root: classes.btn, selected: classes.selected }}
          label="Profile"
          icon={<AccountCircleIcon />}
        />
      </BottomNavigation>
    </>
  );
}
