import React, { useState } from "react";

const initialState = {
  name: "Rishi",
};
const initialState1 = {
  surname: "Srivastava",
};

export const Context = React.createContext();

const GlobalStates = ({ children }) => {
  const [category, setCategory] = useState("cars");
  const [data, setData] = useState();
  const [rot, setRot] = useState(0);

  return (
    <Context.Provider
      value={[category, setCategory, data, setData, rot, setRot]}
    >
      {children}
    </Context.Provider>
  );
};

export default GlobalStates;
