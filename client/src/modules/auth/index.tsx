import React from "react";
import LoginForm from "./LoginForm";
import RegForm from "./RegForm";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = React.useState(true);

  const form = isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <RegForm setIsLogin={setIsLogin} />;

  return <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 1180,
    margin: "0 auto",
  }}>
    {form}
  </div>;
};

export default Login;