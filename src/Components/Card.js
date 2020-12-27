import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 100 + "%",
    background: "#52AFD3",
    color: "#D0FBFD",
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
}) {
  const history = useHistory();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState();

  const handleExpandClick = () => {
    setExpanded(!expanded);
    getComments();
  };

  const getComments = () => {
    axios
      .post(`${API}/getComments`, {
        image_id: image_id,
      })
      .then((res) => {
        setComments(res.data);
        console.log(res.data);
      });
  };

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

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={url} title={name} />
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            setExpanded(false);
            handleClick();
          }}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        Attractive: {((votes / view) * 100).toPrecision(2)}%
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
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
          image_id={image_id}
          userDetails={userDetails}
          setComments={setComments}
          comments={comments}
        />
      </Collapse>
    </Card>
  );
}
