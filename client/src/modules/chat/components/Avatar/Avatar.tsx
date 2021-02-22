import { UserType } from "tools/interfaces";
import React, { useCallback } from "react";
import "./avatar.scss";

interface PropsType {
  additionalClassNames?: string[];
  user: UserType;
  additionalJSX?: JSX.Element,
}

const Avatar: React.FC<PropsType> = ({ user, additionalClassNames, additionalJSX }) => {
  const classNames = additionalClassNames ? ["avatar", ...additionalClassNames] : ["avatar"];
  const getFirstLetter = useCallback(() => {
    if (user.firstName && user.firstName[0]) {
      return user.firstName[0].toUpperCase();
    }
    if (user.login && user.login[0]) {
      return user.login[0].toUpperCase();
    }
  }, [user.firstName, user.login]);

  return (
    <div className={classNames.join(" ")}>
      {
        user.avatar ?
          <img src={user.avatar} alt="" /> :
          <div className="avatar__circle">
            <div className="avatar__letter">{getFirstLetter()}</div>
          </div>
      }
      {additionalJSX}
    </div>
  );
};

export default Avatar;