import React, { useEffect } from "react";
import "./chat.scss";
import socket from "core/socket";
import socketEvents from "core/socket/events";
import DialogList from "./components/DialogList/DialogList";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu";
import MessageList from "./components/MessageList/MessageList";
import { useSelector } from "tools/hooks";
import authActionCreators from "store/auth/actionCreators";
import { useDispatch } from "react-redux";

const Chat: React.FC = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const listenUnauthorized = () => {
    dispatch(authActionCreators.logout());
  };

  useEffect(() => {
    socket.on(socketEvents.unauthorized, listenUnauthorized);
    return () => {
      socket.off(socketEvents.unauthorized, listenUnauthorized);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const creds = [user?._id, user?.login];
    user && socket.emit(socketEvents.join, ...creds);
    return () => {
      socket.emit(socketEvents.leave, new Date(), ...creds);
    };
  }, [user]);

  return (
    <div className="page">
      <div className="chat">
        <div className="container">
          <div className="chat__body">
            <BurgerMenu />
            <DialogList />
            <MessageList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;