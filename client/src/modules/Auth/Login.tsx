import React from "react";
import LoginForm from "./LoginForm";
import RegForm from "./RegForm";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const requireMess = "Поле обязательно для заполнения!";
  const passRules = {
    minLen: 6,
    maxLen: 20,
    minLenErrorMes: "Минимальная длина пароля 6 символов!",
    maxLenErrorMes: "Максимальная длина пароля 20 символов!",
  };
  const loginRules = {
    minLen: 4,
    maxLen: 20,
    minLenErrorMes: "Минимальная длина логина 4 символа!",
    maxLenErrorMes: "Максимальная длина логина 20 символов!",
  };

  if (isLogin) {
    return <LoginForm
      requireMess={requireMess}
      passRules={passRules}
      loginRules={loginRules}
      setIsLogin={setIsLogin}
    />;
  }
  return <RegForm
    requireMess={requireMess}
    passRules={passRules}
    loginRules={loginRules}
    setIsLogin={setIsLogin}
  />;
};

export default Login;