import React from "react";
import "./chat.scss";
import DialogList from "./components/DialogList/DialogList";
import MessageList from "./components/MessageList/MessageList";

const Chat: React.FC = () => {
  return (
    <div className="chat">
      <DialogList />
      <MessageList />
    </div>
  );
};

export default Chat;