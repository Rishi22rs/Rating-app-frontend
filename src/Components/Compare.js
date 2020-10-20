import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, useMotionValue, useTransform } from "framer-motion";

import Container from "@material-ui/core/Container";

import Card from "./Card";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  offsetTop: {
    marginTop: 70,
    marginBottom: 60,
  },
}));

export const nowFetch = async (category) => {
  const response = await axios.post(`http://localhost:6969/random`, {
    category,
  });
  return response.data;
};

const Compare = ({ rot, setRot, category, setCategory, data, setData }) => {
  const classes = useStyles();
  const getContentData = async () => {
    setData(await nowFetch(category));
  };
  useEffect(() => {
    getContentData();
  }, []);

  console.log(data && data[0].url);

  const VoteThis = async (votedPic) => {
    await axios.post(`http://localhost:6969/vote`, { image_id: votedPic });
    setData(null);
    getContentData();
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-100, 0, 100],
    ["#ff008c", "#7700ff", "rgb(230, 255, 0)"]
  );

  const handleClick = (data) => {
    setRot((prev) => prev + 360);
    VoteThis(data && data[0].image_id);
  };

  return (
    <div className={classes.offsetTop}>
      <Container maxWidth="sm">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: rot, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <Card
            //url={data && data[0].url}
            url={
              "https://blackpinkupdate.com/wp-content/uploads/2018/08/BLACKPINK-Jennie-Instagram-Photo-30-August-2018-Disney-Tokyo-3.jpg"
            }
            votes={data && data[0].votes}
            name={data && data[0].name}
            caption={data && data[0].description}
            handleClick={() => handleClick(data)}
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: rot, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <Card
            //url={data && data[1].url}
            url={
              "https://i.pinimg.com/originals/fa/bf/30/fabf306efad2f058dcd10c20d9a380d5.jpg"
            }
            votes={data && data[1].votes}
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
