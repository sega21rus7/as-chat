/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useRef } from "react";
import "./message_list.scss";
import Message from "./Message/Message";
import CreateMessageForm from "./CreateMessageForm/CreateMessageForm";
import { useDispatch } from "react-redux";
import { fetchMessages } from "store/messages/thunkCreators";
import { fetchDialogs } from "store/dialogs/thunkCreators";
import messagesActionCreators from "store/messages/actionCreators";
import dialogsActionCreators from "store/dialogs/actionCreators";
import { useSelector } from "tools/hooks";
import { getFullName } from "tools";
import socket from "core/socket";
import { IMessage } from "tools/interfaces";
import socketEvents from "core/socket/events";
import { Empty, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const MessageList: React.FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages.items);
  const dialog = useSelector(state => state.dialogs.currentDialog);
  const user = useSelector(state => state.auth.user);
  const userID = user?._id;
  const loading = useSelector(state => state.messages.fetchMessagesLoading);
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    listRef.current?.scrollTo(0, listRef.current?.scrollHeight);
  });

  const listenSendMessage = (message: IMessage) => {
    dispatch(messagesActionCreators.addMessage(message));
    dispatch(fetchDialogs());
  };

  const listenDeleteMessage = (message: IMessage, isLast: boolean) => {
    dispatch(messagesActionCreators.removeMessage(message));
    isLast && dispatch(fetchDialogs());
  };

  useEffect(() => {
    if (!dialog) {
      return;
    }
    dispatch(fetchMessages(dialog._id));
    socket.emit(socketEvents.JOIN_ROOM, dialog._id, user?.login);
    socket.on(socketEvents.SEND_MESSAGE, listenSendMessage);
    socket.on(socketEvents.DELETE_MESSAGE, listenDeleteMessage);
    return () => {
      socket.off(socketEvents.SEND_MESSAGE, listenSendMessage);
      socket.off(socketEvents.DELETE_MESSAGE, listenDeleteMessage);
    };
  }, [dialog?._id]);

  const goBack = () => {
    dispatch(dialogsActionCreators.setCurrentDialog(null));
    dispatch(messagesActionCreators.resetMessages());
  };

  if (!dialog) {
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
    <div
      className={dialog._id ? "message-list message-list_visible-md" : "message-list"}
      ref={listRef}
    >
      < div className="message-list__header" >
        <div className="message-list__goback" onClick={goBack}>
          <ArrowLeftOutlined />
        </div>
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
      </div >
      <div className="message-list__body">
        <div className="message-list__items">
          {
            loading ? <div className="message-list__no">
              <Spin />
            </div> :
              !messages?.length ? <div className="message-list__no">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="У вас нет сообщений"
                />
              </div> :
                messages?.map(m => <Message
                  item={m}
                  key={m._id}
                />)}
        </div>
        <CreateMessageForm />
      </div>
    </div >
  );
};

export default MessageList;