import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import axios from "axios";
import { Context } from "../States/GlobalStates";
import TopNav from "./TopNav";
import { useHistory } from "react-router-dom";
import BottomNav from "./BottomNav";
import Explore from "./Explore";
import { API } from "../API/api";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    boxShadow: "inset 0 0 100px black",
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: "white",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  img: {},
}));

export default function Trending() {
  const classes = useStyles();
  const [category, setCategory, data, setData, rot, setRot] = useContext(
    Context
  );
  const [cate, setCate] = useState();
  const history = useHistory();
  useEffect(() => {
    const getCategory = async () => {
      await axios
        .get(`${API}/category`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("t")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setCate(response.data);
        });
    };
    getCategory();
  }, []);
  return (
    <>
      <TopNav title="Trending" />
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          Trending
          {cate &&
            cate.map((tile, key) => (
              <GridListTile
                key={tile.img}
                key={key}
                onClick={() => {
                  setCategory(tile.category);
                  history.push("/");
                }}
              >
                <img src={tile.url} alt="Jennie" />
                <GridListTileBar
                  title={`#${tile.category}`}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                />
              </GridListTile>
            ))}
          {cate &&
            cate.map((tile, key) => (
              <GridListTile key={tile.img} key={key}>
                <img src={tile.url} alt="Jennie" />
                <GridListTileBar
                  title={`#${tile.category}`}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                />
              </GridListTile>
            ))}
          {cate &&
            cate.map((tile, key) => (
              <GridListTile key={tile.img} key={key}>
                <img src={tile.url} alt="Jennie" />
                <GridListTileBar
                  title={`#${tile.category}`}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                />
              </GridListTile>
            ))}
          {cate &&
            cate.map((tile, key) => (
              <GridListTile key={tile.img} key={key}>
                <img src={tile.url} alt="Jennie" />
                <GridListTileBar
                  title={`#${tile.category}`}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                />
              </GridListTile>
            ))}
          {cate &&
            cate.map((tile, key) => (
              <GridListTile key={tile.img} key={key}>
                <img src={tile.url} alt="Jennie" />
                <GridListTileBar
                  title={`#${tile.category}`}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                />
              </GridListTile>
            ))}
          {cate &&
            cate.map((tile, key) => (
              <GridListTile key={tile.img} key={key}>
                <img src={tile.url} alt="Jennie" />
                <GridListTileBar
                  title={`#${tile.category}`}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                />
              </GridListTile>
            ))}
          {cate &&
            cate.map((tile, key) => (
              <GridListTile key={tile.img} key={key}>
                <img src={tile.url} alt="Jennie" />
                <GridListTileBar
                  title={`#${tile.category}`}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                />
              </GridListTile>
            ))}
        </GridList>
      </div>
      <hr />
      <h3>Explore</h3>
      <hr />
      <Explore />
      <BottomNav active={1} />
    </>
  );
}
