import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Redirect, BrowserRouter as Router, Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import axios from "axios";
import { API } from "../API/api";
import CommentList from "./CommentList";
Modal.setAppElement("#imgmodal");

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const ImgModal = ({ showImgModal, setShowImgModal, imgData }) => {
  const [comments, setComments] = useState();

  const getComments = () => {
    axios
      .post(`${API}/getComments`, {
        image_id: imgData && imgData.image_id,
      })
      .then((res) => {
        setComments(res.data);
        console.log(res.data);
      });
  };

  useEffect(() => {
    if (showImgModal == true) getComments();
  }, [showImgModal]);

  const classes = useStyles();
  return (
    <div style={{ zIndex: 9000 }} onClick={() => setShowImgModal(false)}>
      <Modal
        isOpen={showImgModal}
        style={{
          content: {
            padding: 0,
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Jenni"
              height="300"
              image={imgData && imgData.url}
              title="Pixi-mesh"
            />
          </CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <div>Votes: {imgData && imgData.votes}</div>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {imgData && imgData.description}
            </Typography>
          </CardContent>
          <CommentList comments={comments} />
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => setShowImgModal(false)}
            >
              close
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
};
//736304931891-s9bh54hflv1r8upcrd0hokk79p80s5us.apps.googleusercontent.com
export default ImgModal;
