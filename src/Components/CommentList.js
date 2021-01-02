import React, { useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    maxHeight: "200px",
    overflowY: "scroll",
  },
  inline: {
    display: "inline",
  },
}));

export default function CommentList({ comments, color = "#52AFD3" }) {
  const classes = useStyles();

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  const ref = useRef();

  return (
    <>
      <Divider />
      <List className={classes.root} style={{ backgroundColor: color }}>
        {comments &&
          comments.map((x) => (
            <>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={x.name}
                  secondary={<React.Fragment>{x.comment}</React.Fragment>}
                />
              </ListItem>
            </>
          ))}
        <div ref={ref}></div>
      </List>
    </>
  );
}
