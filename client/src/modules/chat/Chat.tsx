import React from "react";
import "./chat.scss";
import DialogList from "./components/DialogList/DialogList";
import DropdownMenu from "./components/DropdownMenu/DropdownMenu";
import MessageList from "./components/MessageList/MessageList";

const Chat: React.FC = () => {
  const user = {
    _id: new Date(2021, 1, 15, 10).toString(),
    firstName: "Вася",
    secondName: "Петров",
    login: "Vasya",
    online: false,
  };

  return (
    <div className="page">
      <div className="chat">
        <div className="container">
          <div className="chat__body">
            <DropdownMenu />
            <DialogList />
            <MessageList user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;