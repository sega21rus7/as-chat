import React from "react";
import "./index.scss";
import { Card } from "antd";
import LoginForm from "./LoginForm";
import RegForm from "./RegForm";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = React.useState(true);

  const form = isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <RegForm setIsLogin={setIsLogin} />;

  return (
    <div className="auth">
      <div className="container full-height-container">
        <div className="auth__row">
          <Card
            title={isLogin ? "Авторизация" : "Регистрация"}
            bordered={false}
          >
            {form}
          </Card>
        </div>
      </div>
    </div >
  );
};

export default Login;