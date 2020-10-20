import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import BarChartIcon from "@material-ui/icons/BarChart";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    width: 100 + "%",
  },
  btn: {
    outline: "none",
    textDecoration: "none",
    border: "none",
  },
});

export default function BottomNav({ toggleDrawer, active = 1 }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(active);

  const history = useHistory();

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        onClick={toggleDrawer("left", true)}
        className={classes.btn}
        label="Trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        onClick={() => history.push(`/main`)}
        className={classes.btn}
        label="Voting area"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        onClick={() => history.push(`/Leaderboard`)}
        className={classes.btn}
        label="Leaderboard"
        icon={<BarChartIcon />}
      />
    </BottomNavigation>
  );
}
