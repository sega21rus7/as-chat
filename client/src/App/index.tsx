import React from "react";
import "./index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "../routes";

const App: React.FC = () => {
  return (
    <Router>
      <BaseRouter />
    </Router>
  );
};

export default App;
