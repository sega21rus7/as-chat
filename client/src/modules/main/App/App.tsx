import React from "react";
import "antd/dist/antd.css";
import Header from "../Header";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "../routes";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <BaseRouter />
    </Router>
  );
};

export default App;
