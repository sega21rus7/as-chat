/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./message_list.scss";
import Message from "./Message/Message";
import CreateMessageForm from "./CreateMessageForm/CreateMessageForm";
import { useDispatch } from "react-redux";
import { fetchMessages } from "store/messages/actionCreators";
import { useSelector } from "tools/hooks";
import { getFullName } from "tools";

const MessageList: React.FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages.items);
  const dialog = useSelector(state => state.dialogs.currentDialog);

  useEffect(() => {
    dialog && dialog._id && dispatch(fetchMessages(dialog._id));
  }, [dialog]);

  if (!messages.length) {
    return (
      <div className="message-list">
        <div className="message-list__no-dialog no-dialog">
          <div className="no-dialog__body">
            <div className="no-dialog__text">
              Выберите, кому хотели бы написать
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="message-list">
      <div className="message-list__header">
        <div className="message-list__title">
          {dialog && getFullName(dialog.companion)}
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
          key={m._id}
          text={m.text}
          date={m.updatedAt}
          user={m.author}
          hasRead={m.hasRead}
        />)}
        <CreateMessageForm />
      </div>
    </div>
  );
};

export default MessageList;