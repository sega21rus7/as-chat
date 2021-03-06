import React from "react";
import "./auth.scss";
import LoginForm from "./components/LoginForm";
import RegForm from "./components/RegForm";

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