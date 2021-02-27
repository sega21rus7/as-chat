import { UserType } from "tools/interfaces";
import React from "react";
import "./avatar.scss";

interface PropsType {
  user: UserType;
  online?: boolean,
}

const Avatar: React.FC<PropsType> = ({ user, online }) => {
  const getFirstLetter = () => {
    if (user.firstName && user.firstName[0]) {
      return user.firstName[0].toUpperCase();
    }
    if (user.login && user.login[0]) {
      return user.login[0].toUpperCase();
    }
  };

  return (
    <div className="avatar">
      {
        user && user.avatar ?
          <img className="avatar__image" src={user.avatar} alt="" /> :
          <div className="avatar__circle">
            <div className="avatar__letter">{getFirstLetter()}</div>
          </div>
      }
      {online && <div className="avatar__online" />}
    </div>
  );
};

export default Avatar;