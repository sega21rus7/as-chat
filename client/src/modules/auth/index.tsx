import React from "react";
import LoginForm from "./LoginForm/index";
import "./index.scss";
import RegForm from "./RegForm";

interface IProps {
  isReg?: boolean;
}

const Auth: React.FC<IProps> = ({ isReg }) => {
  return (
    <div className="auth">
      {isReg ? <RegForm /> : <LoginForm />}
    </div>
  );
};

export default Auth;