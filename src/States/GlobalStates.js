import React, { useState } from "react";
import MyModal from "../Components/MyModal";

export const Context = React.createContext();

const GlobalStates = ({ children }) => {
  const [category, setCategory] = useState("cars");
  const [data, setData] = useState();
  const [rot, setRot] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [auth, setAuth] = useState(401);
  const [userDetails, setUserDetails] = useState();
  const [showLoader, setShowLoader] = useState(false);

  return (
    <>
      <Context.Provider
        value={[
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
        ]}
      >
        <MyModal showModal={showModal} setShowModal={setShowModal} />
        {children}
      </Context.Provider>
    </>
  );
};

export default GlobalStates;
