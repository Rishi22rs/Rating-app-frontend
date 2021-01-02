import React, { useContext, useEffect, useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Context } from "../States/GlobalStates";
import { API } from "../API/api";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function GoogleAuth() {
  const history = useHistory();
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
  const [logged, setLogged] = useState("");
  useEffect(() => {
    if (localStorage.getItem("t") !== "logged out")
      Login(localStorage.getItem("t"));
    if (auth === 401) setLogged("Not Logged In");
  }, []);
  const Login = (response) => {
    axios
      .post(
        `${API}/login`,
        {},
        {
          headers: {
            Authorization: `Bearer ${response}`,
          },
        }
      )
      .then((res) => {
        if (localStorage.getItem("t") === "logged out") setLogged("Logged In");
        else setLogged("");
        localStorage.setItem("t", response);
        setAuth(200);
        setShowModal(false);
        setTimeout(() => {
          setLogged("");
        }, 3000);
        setUserDetails(res.data);
        console.log(res.data.newUser);
        if (res.data.newUser === "true") {
          history.push("/ProfileSetup");
        }
      });
  };
  const responseGoogle = (response) => {
    setLogged("Logged In");
    Login(response.tokenObj.id_token);
  };
  const responseGoogleLogout = () => {
    setAuth(401);
    localStorage.setItem("t", "logged out");
    setShowModal(true);
    setUserDetails();
  };

  return (
    <>
      {auth === 401 ? (
        <GoogleLogin
          clientId="736304931891-s9bh54hflv1r8upcrd0hokk79p80s5us.apps.googleusercontent.com"
          buttonText="Login/Sign Up"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      ) : (
        <GoogleLogout
          clientId="736304931891-s9bh54hflv1r8upcrd0hokk79p80s5us.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={responseGoogleLogout}
        ></GoogleLogout>
      )}
    </>
  );
}
