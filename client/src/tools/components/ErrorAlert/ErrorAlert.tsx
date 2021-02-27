import React from "react";
import "./error_alert.scss";

interface PropsType {
  text: string;
}

const ErrorAlert: React.FC<PropsType> = ({ text }) => {
  return (
    <div className="error-alert">
      {text}
    </div>
  );
};

export default ErrorAlert;