import React from "react";
import LoginForm from "./LoginForm";
import RegForm from "./RegForm";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = React.useState(true);

  if (isLogin) {
    return <LoginForm
      setIsLogin={setIsLogin}
    />;
  }
  return <RegForm
    setIsLogin={setIsLogin}
  />;
};

export default Login;