import React, { useState } from "react";
import PropTypes from "prop-types";

const MainContext = React.createContext({});

const MainProvider = (props) => {
  const [pilots, setPilots] = useState([]);

  return (
    <MainContext.Provider
      value={{
        pilots,
        setPilots,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export { MainContext, MainProvider };
