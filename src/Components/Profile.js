import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import TopNav from "./TopNav";
import { motion } from "framer-motion";
import BottomNav from "./BottomNav";
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
    paddingLeft: 30,
    paddingRight: 30,
  },
}));

const tileData = [
  {
    img:
      "https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2020/01/03/b2e584e8-2df4-11ea-8334-1a17c6a14ef4_image_hires_152432.jpg?itok=4FQSUdpP&v=1578036278",
    title: "Image",
    author: "author",
    cols: 2,
  },
  {
    img:
      "https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2020/01/03/b2e584e8-2df4-11ea-8334-1a17c6a14ef4_image_hires_152432.jpg?itok=4FQSUdpP&v=1578036278",
    title: "Image",
    author: "author",
    cols: 1,
  },
  {
    img:
      "https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2020/01/03/b2e584e8-2df4-11ea-8334-1a17c6a14ef4_image_hires_152432.jpg?itok=4FQSUdpP&v=1578036278",
    title: "Image",
    author: "author",
    cols: 1,
  },
  {
    img:
      "https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2020/01/03/b2e584e8-2df4-11ea-8334-1a17c6a14ef4_image_hires_152432.jpg?itok=4FQSUdpP&v=1578036278",
    title: "Image",
    author: "author",
    cols: 2,
  },
  {
    img:
      "https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2020/01/03/b2e584e8-2df4-11ea-8334-1a17c6a14ef4_image_hires_152432.jpg?itok=4FQSUdpP&v=1578036278",
    title: "Image",
    author: "author",
    cols: 3,
  },
  {
    img:
      "https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2020/01/03/b2e584e8-2df4-11ea-8334-1a17c6a14ef4_image_hires_152432.jpg?itok=4FQSUdpP&v=1578036278",
    title: "Image",
    author: "author",
    cols: 2,
  },
  {
    img:
      "https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2020/01/03/b2e584e8-2df4-11ea-8334-1a17c6a14ef4_image_hires_152432.jpg?itok=4FQSUdpP&v=1578036278",
    title: "Image",
    author: "author",
    cols: 1,
  },
  {
    img:
      "https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2020/01/03/b2e584e8-2df4-11ea-8334-1a17c6a14ef4_image_hires_152432.jpg?itok=4FQSUdpP&v=1578036278",
    title: "Image",
    author: "author",
    cols: 3,
  },
];
export default function ImageGridList() {
  const classes = useStyles();
  const [data, setData] = useState();

  const getPosts = async () => {
    await axios
      .post(
        `http://localhost:6969/profilePosts`,
        { user_id: 2 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("t")}`,
          },
        }
      )
      .then((res) => setData(res.data));
  };
  useEffect(() => {
    getPosts();
  }, []);
  console.log(data);
  let cols = [1, 1, 1, 3];
  return (
    <>
      <TopNav title="lisa_blink" />
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
            src="https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2020/01/03/b2e584e8-2df4-11ea-8334-1a17c6a14ef4_image_hires_152432.jpg?itok=4FQSUdpP&v=1578036278"
            className={classes.large}
          />
        </div>
        <div className={classes.profileContent}>
          <div className={classes.profileRack}>
            <h2>489</h2>
            <p>Ranking</p>
          </div>
          <div className={classes.profileRack}>
            <h2>76</h2>
            <p>Upvotes</p>
          </div>
          <div className={classes.profileRack}>
            <h2>89</h2>
            <p>Posts</p>
          </div>
        </div>
        <hr />
        <h2>Gallery</h2>
        <div className={classes.root}>
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {data &&
              data.map((tile, index) => (
                <GridListTile key={tile.url} cols={cols[index % 4]}>
                  <ObserverWrapper>
                    <img
                      className="lazy"
                      src={tile.url}
                      alt={tile.description}
                    />
                  </ObserverWrapper>
                </GridListTile>
              ))}
          </GridList>
        </div>
      </motion.div>
      <BottomNav active={3} />
    </>
  );
}
