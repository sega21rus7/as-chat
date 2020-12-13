import React from "react";
import LoginForm from "./LoginForm";
import RegForm from "./RegForm";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const requireMessage = "Поле обязательно для заполнения!";

  if (isLogin) {
    return <LoginForm
      requireMessage={requireMessage}
      setIsLogin={setIsLogin}
    />;
  }
  return <RegForm
    requireMessage={requireMessage}
    setIsLogin={setIsLogin}
  />;
};

export default Login;