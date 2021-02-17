import React from "react";
import "./chat.scss";
import DialogList from "./components/DialogList/DialogList";
import DropdownMenu from "./components/DropdownMenu/DropdownMenu";
import MessageList from "./components/MessageList/MessageList";

const Chat: React.FC = () => {
  return (
    <div className="page">
      <div className="chat">
        <div className="container">
          <div className="chat__body">
            <DropdownMenu />
            <DialogList />
            <MessageList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;