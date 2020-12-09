import React, { useState, useEffect, useContext } from "react";
import Compare, { nowFetch } from "./Compare";
import TopNav from "./TopNav";
import { Context } from "../States/GlobalStates";

const Main = () => {
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
  ] = useContext(Context);

  return (
    <>
      <div>
        <TopNav />
        <Compare
          rot={rot}
          setRot={setRot}
          setData={setData}
          data={data}
          setCategory={setCategory}
          category={category}
          auth={auth}
          setAuth={setAuth}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        {/* <Drawer
        rot={rot}
        setRot={setRot}
        setData={setData}
        data={data}
        setCategory={setCategory}
        nowFetch={nowFetch}
        category={category}
      /> */}
      </div>
    </>
  );
};

export default Main;
