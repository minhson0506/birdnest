import React from "react";
import { MainProvider } from './context/MainContext';
import Table from "./component/Table";

const App = () => {
  return (
    // display list of pilot
    <MainProvider>
      <Table />
    </MainProvider>
  );
};

export default App;
