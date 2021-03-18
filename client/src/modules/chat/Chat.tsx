import React, { useEffect } from "react";
import "./chat.scss";
import socket from "core/socket";
import socketEvents from "core/socket/events";
import DialogList from "./components/DialogList/DialogList";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu";
import MessageList from "./components/MessageList/MessageList";
import { useSelector } from "tools/hooks";

const Chat: React.FC = () => {
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const creds = [user?._id, user?.login];
    user && socket.emit(socketEvents.JOIN, ...creds);
    return () => {
      socket.emit(socketEvents.LEAVE, ...creds);
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