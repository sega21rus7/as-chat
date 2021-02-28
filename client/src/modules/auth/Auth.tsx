import React from "react";
import "./auth.scss";
import LoginForm from "./components/LoginForm";
import RegForm from "./components/RegForm";

interface PropsType {
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