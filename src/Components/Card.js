import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useHistory } from "react-router-dom";
import { Context } from "../States/GlobalStates";
import InputComments from "./InputComment";
import axios from "axios";
import { API } from "../API/api";
import CommentList from "./CommentList";
import { useDoubleTap } from "use-double-tap";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 100 + "%",
    color: "#D0FBFD",
    marginLeft: window.innerWidth > 1000 && 100,
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  att: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
}));

export default function RecipeReviewCard({
  //url = "https://blackpinkupdate.com/wp-content/uploads/2018/08/BLACKPINK-Jennie-Instagram-Photo-30-August-2018-Disney-Tokyo-3.jpg",
  url = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Digg-new.svg/1200px-Digg-new.svg.png",
  name = "Rosie",
  caption = "How you like that",
  handleClick,
  votes = 10,
  view = 10,
  image_id = 746,
  color = "#52AFD3",
  below = false,
  showAtt,
  setShowAtt,
  nextMove = false,
}) {
  const history = useHistory();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState([]);

  const handleExpandClick = () => {
    if (window.innerWidth < 1450) {
      setTimeout(() => setExpanded(!expanded), 100);
    }
    getComments();
  };

  const getComments = () => {
    axios
      .post(`${API}/getComments`, {
        image_id: image_id,
      })
      .then((res) => {
        setComments(res.data);
      });
  };
  useEffect(() => {
    if (window.innerWidth > 1450) {
      setExpanded(true);
    }
    getComments();
  }, [image_id]);

  const [
    category,
    setCategory,
    data,
    setData,
    rot,
    setRot,
    showModal,
    setShowModal,
    auth,
    setAuth,
    userDetails,
    setUserDetails,
  ] = useContext(Context);

  const bind = useDoubleTap(() => {
    setShowAtt(true);
    if (nextMove) {
      if (window.innerWidth < 1000) {
        setTimeout(() => setExpanded(!expanded), 100);
      }
      handleClick();
    }
  });

  return (
    <Card className={classes.root} style={{ background: color }} {...bind}>
      {showAtt && !below && (
        <div className={classes.att}>
          Attractive: {((votes / view) * 100).toPrecision(2)}%
        </div>
      )}
      <CardMedia
        className={classes.media}
        image={url}
        title={name}
        onClick={handleExpandClick}
      />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              if (window.innerWidth < 1000) {
                setExpanded(false);
              }
              setShowAtt(true);
              handleClick();
            }}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
        <CardHeader
          onClick={() => history.push(`/Profile/lisa_blink`)}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {name && name.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={name}
          subheader="September 14, 2016"
        />
        <hr />
        <CardContent>
          <Typography paragraph>{caption}</Typography>
        </CardContent>
        <CommentList comments={comments} />
        <InputComments
          auth={auth}
          setShowModal={setShowModal}
          image_id={image_id}
          userDetails={userDetails}
          setComments={setComments}
          comments={comments}
        />
      </Collapse>
      {showAtt && below && (
        <div className={classes.att}>
          Attractive: {((votes / view) * 100).toPrecision(2)}%
        </div>
      )}
    </Card>
  );
}
