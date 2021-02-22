import React, { useEffect } from "react";
import "./message_list.scss";
import Message from "./Message/Message";
import CreateMessageForm from "./CreateMessageForm/CreateMessageForm";
import { UserType } from "tools/interfaces";
import { useDispatch } from "react-redux";
import { fetchMessages } from "store/messages/actionCreators";
import { useSelector } from "tools/hooks";
import { getFullName } from "tools";

interface PropsType {
  user: UserType,
}

const MessageList: React.FC<PropsType> = ({ user }) => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages.items);

  useEffect(() => {
    dispatch(fetchMessages("6033956a5ad7591abc285984"));
  });

  return (
    <div className="message-list">
      <div className="message-list__header">
        <div className="message-list__title">
          {getFullName(user)}
        </div>
        <div className="message-list__subtitle">
          <div className="message-list__online message-online-icon">
            <div className="message-online-icon__body" />
          </div>
          <p>Online</p>
        </div>
      </div>
      <div className="message-list__body">
        {messages.map(m => <Message
          text={m.text}
          date={m.updatedAt}
          user={m.author}
          my
          hasRead={m.hasRead}
        />)}
        <CreateMessageForm />
      </div>
    </div>
  );
};

export default MessageList;