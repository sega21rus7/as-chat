/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./auth.scss";
import LoginForm from "./components/LoginForm";
import RegForm from "./components/RegForm";
import errorSvg from "./assets/svg/error.svg";
import { useSelector } from "tools/hooks";
import { useDispatch } from "react-redux";
import { startAuth } from "store/auth/actionCreators";

type PropsType = {
  isReg?: boolean;
}

const Auth: React.FC<PropsType> = ({ isReg }) => {
  const dispatch = useDispatch();

  const error = useSelector(state => state.auth.error);
  useEffect(() => {
    error && setTimeout(() => {
      dispatch(startAuth());
    }, 2000);
  }, [error]);

  return (
    <div className="auth">
      {isReg ? <RegForm /> : <LoginForm />}
      <div className={
        error ?
          "auth__error auth-error auth__error_active" :
          "auth__error auth-error"
      }>
        <img className="auth-error__image" src={errorSvg} alt="" />
        <p className="auth-error__text">{error}</p>
      </div>
    </div>
  );
};

export default Auth;