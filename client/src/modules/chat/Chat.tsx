import React from "react";
import { useSelector } from "tools/hooks";
import "./chat.scss";
import DialogList from "./components/DialogList/DialogList";
import DropdownMenu from "./components/DropdownMenu/DropdownMenu";
import MessageList from "./components/MessageList/MessageList";

const Chat: React.FC = () => {
  const burgerActive = useSelector(state => state.dropdownMenu.active);

  return (
    <div className="page">
      <div className="chat">
        <div className="container">
          <div className="chat__body">
            {burgerActive && <DropdownMenu />}
            <DialogList />
            <MessageList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;