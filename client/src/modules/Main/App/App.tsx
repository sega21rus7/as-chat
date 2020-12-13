import React from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import Header from "../Header";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "../routes";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Header />
        <BaseRouter />
      </Layout>
    </Router>
  );
};

export default App;
