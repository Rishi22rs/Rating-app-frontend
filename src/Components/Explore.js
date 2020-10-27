import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import axios from "axios";
import ObserverWrapper from "@emarketeross/simple-react-intersection-observer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "white",
  },
}));

export default function Explore() {
  const classes = useStyles();
  const [data, setData] = useState();
  useEffect(() => {
    const getCategory = async () => {
      await axios
        .get(`http://localhost:6969/explore`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("t")}`,
          },
        })
        .then((response) => {
          console.log(response);
          setData(response.data);
        });
    };
    getCategory();
  }, []);
  return (
    <div className={classes.root}>
      <GridList cellHeight={200} spacing={1} className={classes.gridList}>
        {data &&
          data.map((tile) => (
            <GridListTile
              key={tile.img}
              cols={tile.featured ? 2 : 1}
              rows={tile.featured ? 2 : 1}
            >
              <ObserverWrapper>
                <img src={tile.url} alt={tile.category} />
              </ObserverWrapper>
              <GridListTileBar
                title={tile.category}
                titlePosition="top"
                actionIcon={
                  <IconButton
                    aria-label={`star ${tile.name}`}
                    className={classes.icon}
                  >
                    <StarBorderIcon />
                  </IconButton>
                }
                actionPosition="left"
                className={classes.titleBar}
              />
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
}
