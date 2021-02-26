/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useRef } from "react";
import "./message_list.scss";
import Message from "./Message/Message";
import CreateMessageForm from "./CreateMessageForm/CreateMessageForm";
import { useDispatch } from "react-redux";
import { addMessage, fetchMessages } from "store/messages/actionCreators";
import { useSelector } from "tools/hooks";
import { getFullName } from "tools";
import socket from "core/socket";
import { MessageType } from "tools/interfaces";

const MessageList: React.FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages.items);
  const dialog = useSelector(state => state.dialogs.currentDialog);
  const userID = useSelector(state => state.auth.user?._id);
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    listRef.current?.scrollTo(0, listRef.current?.scrollHeight);
  });

  useEffect(() => {
    if (!dialog) {
      return;
    }

    dispatch(fetchMessages(dialog._id));
    socket.on("MESSAGE_CREATED", (message: MessageType) => {
      if (message.dialog === dialog._id && message.author._id !== userID) {
        dispatch(addMessage(message));
      }
    });
  }, [dialog?._id]);

  if (!messages.length) {
    return (
      <div className="message-list">
        <div className="message-list__no no-message">
          <div className="no-message__body">
            <div className="no-message__text">
              Выберите, кому хотели бы написать
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="message-list" ref={listRef}>
      <div className="message-list__header">
        <div className="message-list__title">
          {dialog &&
            getFullName(userID === dialog.author._id ? dialog.companion : dialog.author)}
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
          author={m.author}
          hasRead={m.hasRead}
        />)}
        <CreateMessageForm />
      </div>
    </div>
  );
};

export default MessageList;