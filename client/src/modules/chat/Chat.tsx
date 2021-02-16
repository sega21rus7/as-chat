import React from "react";
import Message from "./components/Message/Message";
import "./chat.scss";
import avatar from "./assets/img/avatar.jpg";
import DialogList from "./components/DialogList/DialogList";

const Chat: React.FC = () => {
  return (
    <div>
      <Message
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum hic inventore rem perspiciatis perferendis quo placeat, consequuntur, consectetur aspernatur, ullam ipsum. Et porro quo error est iure, itaque voluptate quaerat."
        date={1613459614439}
        avatar={avatar}
      />
      <Message
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum hic inventore rem perspiciatis perferendis quo placeat, consequuntur, consectetur aspernatur, ullam ipsum. Et porro quo error est iure, itaque voluptate quaerat."
        date={1613463236787}
        avatar={avatar}
        my
        hadRead
      />
      <hr />
      <DialogList />
    </div>
  );
};

export default Chat;