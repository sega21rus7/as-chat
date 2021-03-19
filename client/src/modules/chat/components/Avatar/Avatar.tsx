import { IUser } from "tools/interfaces";
import React from "react";
import "./avatar.scss";
import { useSelector } from "tools/hooks";

interface IProps {
  user: IUser;
  online?: boolean | undefined | null;
  classNames?: string;
  hideOnline?: boolean;
}

const Avatar: React.FC<IProps> = ({ user, online, classNames, hideOnline }) => {
  const onlineFromStore = useSelector(state => state.dialogs.userOnline);

  const getFirstLetter = () => {
    if (user.firstName && user.firstName[0]) {
      return user.firstName[0].toUpperCase();
    }
    if (user.login && user.login[0]) {
      return user.login[0].toUpperCase();
    }
  };

  return (
    <div className={classNames ? `${classNames} avatar` : "avatar"}>
      {
        user && user.avatar ?
          <img className="avatar__image" src={user.avatar} alt="" /> :
          <div className="avatar__circle">
            <div className="avatar__letter">{getFirstLetter()}</div>
          </div>
      }
      {(onlineFromStore || online) && !hideOnline && <div className="avatar__online" />}
    </div>
  );
};

export default Avatar;