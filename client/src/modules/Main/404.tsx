import React from "react";
import { Alert } from "antd";

const Component404: React.FC = () => {
  return <Alert
    style={{
      padding: "20px 50px",
    }}
    message="Произошла ошибка"
    description="Такой страницы не существует."
    type="error"
    showIcon
  />;
};

export default Component404;