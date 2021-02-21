import React from "react";
import "./chat.scss";
import DialogList from "./components/DialogList/DialogList";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu";
import MessageList from "./components/MessageList/MessageList";

const Chat: React.FC = () => {
  const user = {
    _id: new Date(2021, 1, 15, 10).toString(),
    firstName: "Вася",
    lastName: "Петров",
    login: "Vasya",
  };

  return (
    <div className="page">
      <div className="chat">
        <div className="container">
          <div className="chat__body">
            <BurgerMenu />
            <DialogList />
            <MessageList user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;