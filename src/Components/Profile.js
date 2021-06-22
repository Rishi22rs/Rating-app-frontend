import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import axios from "axios";
import { API } from "../API/api";
import { Context } from "../States/GlobalStates";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";

import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import ImgModal from "./ImgModal";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: "flex",
  //   flexWrap: "wrap",
  //   justifyContent: "space-around",
  //   overflow: "hidden",
  //   //marginTop: -8,
  // },
  root: {
    position: "relative",
    maxWidth: "900px" /* Your required width here. */,
    width: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    height: "100%",
  },
  // gridList: {
  //   width: "100%",
  //   height: "100%",
  // },
  profile: {
    padding: 50,
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    borderRadius: "10px",
  },
  pDetail: {
    padding: 20,
  },
  nameEdit: {
    display: "flex",
    justifyContent: "space-between",
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
  icon: {
    height: 40,
    width: 40,
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
  const history = useHistory();
  const classes = useStyles();
  const [data, setData] = useState([]);
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
    showLoader,
    setShowLoader,
  ] = useContext(Context);
  const [showImgModal, setShowImgModal] = useState(false);
  const [imgData, setImgData] = useState();
  const [pDetails, setPDetails] = useState([]);
  const getPosts = async () => {
    setShowLoader(true);
    await axios
      .post(
        `${API}/profilePosts`,
        { user_id: userDetails && userDetails[0].user_id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("t")}`,
          },
        }
      )
      .then((res) => {
        setData(res.data);
        setAuth(200);
        setShowLoader(false);
      })
      .catch((err) => setAuth(401));
  };

  const getDetails = () => {
    axios
      .post(
        `${API}/getUserDetails`,
        { user_id: userDetails && userDetails[0].user_id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("t")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setPDetails(res.data);
        if (res.data.length === 0) {
          history.push("/ProfileSetup");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleImgClick = (imgData) => {
    setImgData(imgData);
    setShowImgModal(true);
  };

  useEffect(() => {
    if (auth === 401) {
      setShowModal(true);
    }
    getPosts();
    getDetails();
  }, []);

  let cols = [1, 1, 1, 3];
  return (
    <>
      <ImgModal
        auth={auth}
        showImgModal={showImgModal}
        setShowImgModal={setShowImgModal}
        imgData={imgData}
        userDetails={userDetails}
      />
      <TopNav title={userDetails && userDetails[0].name} />
      {auth !== 401 && (
        <>
          <div className={classes.root}>
            <div className={classes.profile}>
              <img
                alt="Remy Sharp"
                src="https://i.insider.com/5e820b04671de06758588fb8?width=600&format=jpeg&auto=webp"
                className={classes.large}
              />
            </div>
            <div className={classes.pDetail}>
              <div className={classes.nameEdit}>
                <h3>{pDetails.length !== 0 && pDetails[0].username}</h3>
                <Fab
                  className={classes.icon}
                  color="secondary"
                  aria-label="edit"
                  onClick={() =>
                    history.push({ pathname: "/ProfileSetup", state: pDetails })
                  }
                >
                  <EditIcon />
                </Fab>
              </div>
              <p>{pDetails.length !== 0 && pDetails[0].bio}</p>
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
            <div>
              <GridList cellHeight={160} className={classes.gridList} cols={3}>
                {data &&
                  data.map((tile, index) => (
                    <GridListTile key={tile.url} cols={cols[index % 4]}>
                      <img
                        onClick={() => handleImgClick(tile)}
                        className="lazy"
                        src={tile.url}
                        alt={tile.description}
                      />
                    </GridListTile>
                  ))}
              </GridList>
            </div>
          </div>
        </>
      )}
      {window.innerWidth < 1000 && <BottomNav active={4} />}
    </>
  );
}
