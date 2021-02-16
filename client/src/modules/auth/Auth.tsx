import React from "react";
import LoginForm from "./components/LoginForm";
import "./auth.scss";
import RegForm from "./components/RegForm";

type PropsType = {
  isReg?: boolean;
}

const Auth: React.FC<PropsType> = ({ isReg }) => {
  return (
    <div className="auth">
      {isReg ? <RegForm /> : <LoginForm />}
    </div>
  );
};

export default Auth;