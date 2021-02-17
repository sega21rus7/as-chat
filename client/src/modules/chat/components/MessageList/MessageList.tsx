import React from "react";
import "./message_list.scss";
import Message from "./Message/Message";
import avatar from "../assets/img/avatar.jpg";

const MessageList: React.FC = () => {
  return (
    <div className="message-list">
      <div className="message-list__title">
        Тест Тестов
      </div>
      <div className="message-list__subtitle">
        <div className="message-list__online-wrapper">
          <div className="message-list__online" />
        </div>
        <p>Online</p>
      </div>
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
    </div>
  );
};

export default MessageList;