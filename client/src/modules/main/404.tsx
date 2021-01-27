import React from "react";
import { Alert } from "antd";

const Component404: React.FC = () => {
  return <Alert
    message="Произошла ошибка"
    description="Такой страницы не существует."
    type="error"
    showIcon
  />;
};

export default Component404;