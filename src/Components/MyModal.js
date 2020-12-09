import React, { useState } from "react";
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

Modal.setAppElement("#mymodal");

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const MyModal = ({ showModal, setShowModal }) => {
  const handleClick = () => {
    setShowModal(false);
  };

  const classes = useStyles();
  return (
    <Router>
      <div style={{ zIndex: 9000 }}>
        <Modal
          isOpen={showModal}
          style={{
            content: {
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
                height="140"
                image="https://blackpinkupdate.com/wp-content/uploads/2018/08/BLACKPINK-Jennie-Instagram-Photo-30-August-2018-Disney-Tokyo-3.jpg"
                title="Pixi-mesh"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Not Logged In
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  You need to log in to enjoy the the full features of this app
                  like posting pics, voting and creating your own profile.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to="/">
                <Button size="small" color="primary" onClick={handleClick}>
                  Okay
                </Button>
              </Link>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Modal>
      </div>
    </Router>
  );
};
//736304931891-s9bh54hflv1r8upcrd0hokk79p80s5us.apps.googleusercontent.com
export default MyModal;
