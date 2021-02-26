import React from "react";
import "./auth.scss";
import LoginForm from "./components/LoginForm";
import RegForm from "./components/RegForm";
import { useSelector } from "tools/hooks";

import ErrorMessage from "tools/components/ErrorMessage";

type PropsType = {
  isReg?: boolean;
}

const Auth: React.FC<PropsType> = ({ isReg }) => {
  const error = useSelector(state => state.auth.error);

  return (
    <div className="auth">
      {isReg ? <RegForm /> : <LoginForm />}
      <ErrorMessage error={error} />
    </div>
  );
};

export default Auth;