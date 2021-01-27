import React from "react";
import { Alert } from "antd";
import { isAuth } from "../";

interface IProps {
  children: JSX.Element,
}

const ErrorIfNotAuth: React.FC<IProps> = props => {
  if (!isAuth()) {
    return <Alert
      message="Произошла ошибка"
      description="Вы не авторизованы"
      type="error"
      showIcon
    />;
  }

  return props.children;
};

export default ErrorIfNotAuth;