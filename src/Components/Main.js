import React, { useState, useEffect } from "react";
import Drawer from "./MyDrawer";
import Compare, { nowFetch } from "./Compare";
import SimpleBottomNavigation from "./BottomNav";
import TopNav from "./TopNav";

const Main = () => {
  const [category, setCategory] = useState("cars");
  const [data, setData] = useState();
  const [rot, setRot] = useState(0);
  return (
    <>
      <TopNav />
      <Compare
        rot={rot}
        setRot={setRot}
        setData={setData}
        data={data}
        setCategory={setCategory}
        category={category}
      />
      <Drawer
        rot={rot}
        setRot={setRot}
        setData={setData}
        data={data}
        setCategory={setCategory}
        nowFetch={nowFetch}
        category={category}
      />
    </>
  );
};

export default Main;
