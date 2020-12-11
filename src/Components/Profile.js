import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import TopNav from "./TopNav";
import { motion } from "framer-motion";
import BottomNav from "./BottomNav";
import axios from "axios";
import { API } from "../API/api";
import { Context } from "../States/GlobalStates";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    //marginTop: -8,
  },
  gridList: {
    width: "100%",
    height: "100%",
  },
  profile: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    borderRadius: "10px",
  },
  profileContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  profileRack: {
    padding: "10px 0 0px 0",
    width: 100 + "%",
    color: "white",
  },
  profileRackTile1: {
    background: "#63539E",
  },
  profileRackTile2: {
    background: "#4873A6",
  },
  profileRackTile3: {
    background: "#63539E",
  },
  title: {
    padding: 20,
    background: "#FF7FE6",
    height: 80,
    color: "white",
  },
}));

export default function ImageGridList() {
  const classes = useStyles();
  const [data, setData] = useState();
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
    userDetails,
    setUserDetails,
  ] = useContext(Context);
  console.log(userDetails);
  const getPosts = async () => {
    await axios
      .post(
        `${API}/profilePosts`,
        { user_id: 1 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("t")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setAuth(200);
      })
      .catch((err) => setAuth(err.response.status));
  };

  useEffect(() => {
    if (auth === 401) {
      setShowModal(true);
    }
    getPosts();
  }, []);
  let cols = [1, 1, 1, 3];
  return (
    <>
      <TopNav title={userDetails && userDetails[0].name} />
      {auth !== 401 && (
        <>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <div className={classes.profile}>
              <img
                alt="Remy Sharp"
                src="https://i.insider.com/5e820b04671de06758588fb8?width=600&format=jpeg&auto=webp"
                className={classes.large}
              />
            </div>
            <div className={classes.profileContent}>
              <div
                className={`${classes.profileRack} ${classes.profileRackTile1}`}
              >
                <h2>489</h2>
                <p>Ranking</p>
              </div>
              <div
                className={`${classes.profileRack} ${classes.profileRackTile2}`}
              >
                <h2>76</h2>
                <p>Upvotes</p>
              </div>
              <div
                className={`${classes.profileRack} ${classes.profileRackTile3}`}
              >
                <h2>89</h2>
                <p>Posts</p>
              </div>
            </div>
            <h2 className={classes.title}>Gallery</h2>
            <div className={classes.root}>
              <GridList cellHeight={160} className={classes.gridList} cols={3}>
                {data &&
                  data.map((tile, index) => (
                    <GridListTile key={tile.url} cols={cols[index % 4]}>
                      <img
                        className="lazy"
                        src={tile.url}
                        alt={tile.description}
                      />
                    </GridListTile>
                  ))}
              </GridList>
            </div>
          </motion.div>
        </>
      )}
      {!showModal && <BottomNav active={4} />}
    </>
  );
}
