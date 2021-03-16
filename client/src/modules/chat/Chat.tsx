import React from "react";
import "./chat.scss";
import DialogList from "./components/DialogList/DialogList";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu";
import MessageList from "./components/MessageList/MessageList";

const Chat: React.FC = () => {

  return (
    <div className="page">
      <div className="chat">
        <div className="container">
          <div className="chat__body">
            <div className="chat__burger-menu">
              <BurgerMenu />
            </div>
            <div className="chat__dialog-list">
              <DialogList />
            </div>
            <div className="chat__message-list">
              <MessageList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;