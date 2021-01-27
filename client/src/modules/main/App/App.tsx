import React from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import "./index.scss";
import CustomHeader from "../Header";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "../routes";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <div className="wrapper">
        <CustomHeader />
        <Content className="content">
          <BaseRouter />
        </Content>
      </div>
    </Router>
  );
};

export default App;
