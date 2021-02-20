import React from "react";
import "./message_list.scss";
import Message from "./Message/Message";
import CreateMessageForm from "./CreateMessageForm/CreateMessageForm";
import { UserType } from "modules/chat/interfaces";

interface PropsType {
  user: UserType,
}

const MessageList: React.FC<PropsType> = ({ user }) => {
  return (
    <div className="message-list">
      <div className="message-list__header">
        <div className="message-list__title">
          {`${user.firstName} ${user.secondName}`}
        </div>
        <div className="message-list__subtitle">
          <div className="message-list__online message-online-icon">
            <div className="message-online-icon__body" />
          </div>
          <p>Online</p>
        </div>
      </div>
      <div className="message-list__body">
        <Message
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum hic inventore rem perspiciatis perferendis quo placeat, consequuntur, consectetur aspernatur, ullam ipsum. Et porro quo error est iure, itaque voluptate quaerat."
          date={1613459614439}
          user={user}
        />
        <Message
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum hic inventore rem perspiciatis perferendis quo placeat, consequuntur, consectetur aspernatur, ullam ipsum. Et porro quo error est iure, itaque voluptate quaerat."
          date={1613463236787}
          user={user}
          my
          hadRead
        />
        <CreateMessageForm />
      </div>
    </div>
  );
};

export default MessageList;