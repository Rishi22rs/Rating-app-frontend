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
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  offsetBottom: {},
  container: {
    display: window.innerWidth < 1200 ? "" : "flex",
    marginBottom: 70,
    height: "100%",
  },
  card: {
    // margin: 200,
    height: "100%",
  },
}));
console.log(window.innerWidth);

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
  showLoader,
  setShowLoader,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const [showAtt, setShowAtt] = useState(false);
  const [nextMove, setNextMove] = useState(true);
  const getContentData = async () => {
    setShowLoader(true);
    let putThis = await nowFetch(category);
    setTimeout(() => {
      setShowAtt(false);
      setData(putThis);
      setNextMove(true);
      setShowLoader(false);
    }, 3000);
  };
  window.scrollTo(0, 0);
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

  const handleClick = (data) => {
    setNextMove(false);
    setRot((prev) => prev + 360);
    if (auth === 200) VoteThis(data && data[0].image_id);
    else setShowModal(true);
  };

  return (
    <Container
      maxWidth={
        window.innerWidth > 1300 ? "lg" : window.innerWidth < 1200 ? "sm" : "md"
      }
      className={classes.container}
    >
      <motion.div
        className={classes.card}
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: rot }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: 0.5,
        }}
      >
        <Card
          auth={auth}
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
          showAtt={showAtt}
          setShowAtt={setShowAtt}
          nextMove={nextMove}
          below={window.innerWidth < 1000 ? true : false}
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
          delay: 0.5,
        }}
      >
        <Card
          auth={auth}
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
          showAtt={showAtt}
          setShowAtt={setShowAtt}
          nextMove={nextMove}
        />
      </motion.div>
    </Container>
  );
};

export default Compare;
