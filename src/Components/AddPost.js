import { Button, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { API } from "../API/api";
import { Context } from "../States/GlobalStates";
import BottomNav from "./BottomNav";
import TopNav from "./TopNav";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    maxWidth: "900px" /* Your required width here. */,
    width: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
  },
  toolbar: {},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginLeft: 20,
    flexGrow: 1,
  },
  offsetTop: {
    marginTop: 70,
  },
  logged: {
    textAlign: "center",
  },
  img: {
    margin: "auto",
    width: "80%",
    objectFit: "cover",
  },
}));

const AddPost = () => {
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
    showLoader,
    setShowLoader,
  ] = useContext(Context);

  const classes = useStyles();
  const ref = useRef();

  const [content, setContent] = useState({
    fileData: "",
    description: "",
    category: "",
  });
  const [img, setImg] = useState("");

  const handleFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImg(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    setContent({
      fileData: e.target.files[0],
      description: content.description,
      category: content.category,
    });
  };

  const handleDataD = (e) => {
    setContent({
      fileData: content.fileData,
      description: e.target.value,
      category: content.category,
    });
  };

  const handleDataC = (e) => {
    setContent({
      fileData: content.fileData,
      description: content.description,
      category: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AddImages();
  };

  const [uploadPer, setUploadPer] = useState(0);

  const user_id = userDetails && userDetails[0].user_id;

  const AddImages = () => {
    const formData = new FormData();
    console.log(content);
    formData.append("user_id", user_id);
    formData.append("fileData", content.fileData);
    formData.append("description", content.description);
    formData.append("category", content.category);
    setShowLoader(true);
    axios
      .post(`${API}/addImages`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPer(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      })
      .then((res) => {
        console.log(res);
        setShowLoader(false);
        setContent(res.data);
      });
  };

  return (
    <>
      <TopNav title="Add Post" />
      <form className={classes.root}>
        {img !== "" && (
          <img
            className={classes.img}
            style={{ marginBottom: "20px" }}
            src={img}
            alt="img"
          />
        )}
        <input
          style={{ display: "none" }}
          ref={ref}
          type="file"
          onChange={(e) => handleFile(e)}
        />
        <Button
          style={{ marginBottom: "20px" }}
          variant="outlined"
          color="primary"
          onClick={() => ref.current.click()}
        >
          Add Image
        </Button>
        <TextField
          onChange={(e) => handleDataD(e)}
          style={{ marginBottom: "20px" }}
          className={classes.root}
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          variant="outlined"
        />
        <FormControl
          variant="outlined"
          className={classes.formControl}
          style={{ marginBottom: "20px" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={content && content.category}
            label="Age"
            onChange={(e) => handleDataC(e)}
          >
            <MenuItem value={"Open battle"}>Open battle</MenuItem>
            <MenuItem value={"Cars"}>Cars</MenuItem>
            <MenuItem value={"Bikes"}>Bikes</MenuItem>
          </Select>
        </FormControl>
        {showLoader && (
          <LinearProgress
            variant="determinate"
            value={uploadPer}
            style={{ marginBottom: "20px" }}
          />
        )}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Upload
        </Button>
      </form>

      {window.innerWidth < 1000 && <BottomNav active={2} />}
    </>
  );
};

export default AddPost;
