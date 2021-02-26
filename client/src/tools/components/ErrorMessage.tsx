/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./error_message.scss";
import errorSvg from "./assets/svg/error.svg";
import { startAuth } from "store/auth/actionCreators";

interface PropsType {
  error: string;
}

const ErrorMessage: React.FC<PropsType> = ({ error }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    error && setTimeout(() => {
      dispatch(startAuth());
    }, 2000);
  }, [error]);

  return (
    <div className={
      error ?
        "error-message error-message_active" :
        "error-message"
    }>
      <img className="error-message__image" src={errorSvg} alt="" />
      <p className="error-message__text">{error}</p>
    </div>
  );
};

export default ErrorMessage;