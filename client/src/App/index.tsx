import React from "react";
import "./index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "../routes";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <div className="content">
          <BaseRouter />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
