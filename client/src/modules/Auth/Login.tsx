import React from "react";
import LoginForm from "./LoginForm";
import RegForm from "./RegForm";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const requireMess = "Поле обязательно для заполнения!";

  if (isLogin) {
    return <LoginForm
      requireMess={requireMess}
      setIsLogin={setIsLogin}
    />;
  }
  return <RegForm
    requireMess={requireMess}
    setIsLogin={setIsLogin}
  />;
};

export default Login;