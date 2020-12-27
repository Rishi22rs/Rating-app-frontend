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
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 400,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "left",
    overflow: "scroll",
    padding: "0px 10px 0px 10px",
    marginBottom: 10,
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
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group"
        >
          {cate &&
            cate.map((tile, key) => (
              <Button
                onClick={() => {
                  setCategory(tile.category);
                  history.push("/");
                }}
              >
                #{tile.category}
              </Button>
            ))}
          {cate && cate.map((tile, key) => <Button>#{tile.category}</Button>)}
          {cate && cate.map((tile, key) => <Button>#{tile.category}</Button>)}
          {cate && cate.map((tile, key) => <Button>#{tile.category}</Button>)}
          {cate && cate.map((tile, key) => <Button>#{tile.category}</Button>)}
          {cate && cate.map((tile, key) => <Button>#{tile.category}</Button>)}
          {cate && cate.map((tile, key) => <Button>#{tile.category}</Button>)}
        </ButtonGroup>
      </div>
      <Explore />
      <BottomNav active={1} />
    </>
  );
}
