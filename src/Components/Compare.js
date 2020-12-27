import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Container from "@material-ui/core/Container";

import Card from "./Card";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { API } from "../API/api";
import ReactSnapScroll from "react-snap-scroll";

const useStyles = makeStyles((theme) => ({
  offsetBottom: {
    marginBottom: 70,
  },
  container: {
    height: "100%",
  },
  card: {
    height: "100%",
    scrollSnapAlign: "start",
  },
}));

export const nowFetch = async (category) => {
  const response = await axios.post(
    `${API}/random`,
    {
      category,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("t")}`,
      },
    }
  );
  console.log(response.data);
  return response.data;
};
const Compare = ({
  rot,
  setRot,
  category,
  setCategory,
  data,
  setData,
  auth,
  setAuth,
  showModal,
  setShowModal,
}) => {
  const controls = useAnimation();
  const history = useHistory();
  const classes = useStyles();

  function callback() {
    console.log("element snapped");
  }

  const getContentData = async () => {
    let putThis = await nowFetch(category);
    console.log(putThis);
    setTimeout(() => setData(putThis), 1000);
  };
  useEffect(() => {
    console.log(auth);
    getContentData();
    setRot(0);
  }, []);

  const VoteThis = async (votedPic) => {
    await axios.post(
      `${API}/vote`,
      { image_id: votedPic },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("t")}`,
        },
      }
    );
    await axios.post(
      `${API}/view`,
      { image_id1: data[0].image_id, image_id2: data[1].image_id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("t")}`,
        },
      }
    );
    getContentData();
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const handleClick = (data) => {
    setRot((prev) => prev + 360);
    if (auth === 200) VoteThis(data && data[0].image_id);
    else setShowModal(true);
  };

  return (
    <div className={classes.offsetBottom}>
      <Container maxWidth="sm" className={classes.container}>
        <motion.div
          className={classes.card}
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: rot }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 1,
          }}
          exit={{ opacity: 0 }}
        >
          <Card
            image_id={data && data[0].image_id}
            url={data && data[0].url}
            // url={
            //   "https://blackpinkupdate.com/wp-content/uploads/2018/08/BLACKPINK-Jennie-Instagram-Photo-30-August-2018-Disney-Tokyo-3.jpg"
            // }
            votes={data && data[0].votes}
            views={data && data[0].views}
            name={data && data[0].name}
            caption={data && data[0].description}
            handleClick={() => handleClick(data)}
          />
        </motion.div>
        <br />
        <motion.div
          className={classes.card}
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: rot }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 1,
          }}
        >
          <Card
            image_id={data && data[1].image_id}
            url={data && data[1].url}
            // url={
            //   "https://i.pinimg.com/originals/fa/bf/30/fabf306efad2f058dcd10c20d9a380d5.jpg"
            // }
            votes={data && data[1].votes}
            views={data && data[1].views}
            name={data && data[1].name}
            caption={data && data[1].description}
            handleClick={() => handleClick(data)}
          />
        </motion.div>
      </Container>
    </div>
  );
};

export default Compare;
