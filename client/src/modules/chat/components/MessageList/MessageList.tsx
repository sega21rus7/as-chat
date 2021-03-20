/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./message_list.scss";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ruLocale from "date-fns/locale/ru";
import Message from "./Message/Message";
import CreateMessageForm from "./CreateMessageForm/CreateMessageForm";
import { useDispatch } from "react-redux";
import { fetchMessages } from "store/messages/thunkCreators";
import { fetchDialogs } from "store/dialogs/thunkCreators";
import messagesActionCreators from "store/messages/actionCreators";
import dialogsActionCreators from "store/dialogs/actionCreators";
import { useSelector } from "tools/hooks";
import { getAuthorOrCompanionDependsOnUserID, getFullName } from "tools";
import socket from "core/socket";
import { IMessage } from "tools/interfaces";
import socketEvents from "core/socket/events";
import { Empty, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Avatar from "../Avatar/Avatar";

const MessageList: React.FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages.items);
  const dialog = useSelector(state => state.dialogs.currentDialog);
  const user = useSelector(state => state.auth.user);
  const userID = user?._id;
  const loading = useSelector(state => state.messages.fetchMessagesLoading);
  const [isOnline, setOnline] = useState<boolean | undefined | null>(false);
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    listRef.current?.scrollTo(0, listRef.current?.scrollHeight);
  });

  const listenSendMessage = (message: IMessage) => {
    dispatch(messagesActionCreators.addMessage(message));
    dispatch(fetchDialogs());
    socket.emit(socketEvents.updateMessagesHasRead, user?._id, dialog?._id, user?.login);
  };

  const listenDeleteMessage = (message: IMessage, isLast: boolean) => {
    dispatch(messagesActionCreators.removeMessage(message));
    isLast && dispatch(fetchDialogs());
  };

  const listenOnline = () => {
    socket.emit(
      socketEvents.isOnline,
      userID && dialog && getAuthorOrCompanionDependsOnUserID(userID, dialog)._id,
      (onlineStatus: boolean | undefined | null) => {
        setOnline(onlineStatus);
        dispatch(dialogsActionCreators.setUserOnline(onlineStatus || false));
      },
    );
  };

  const listenUpdateMessagesHasRead = () => {
    dialog && dispatch(fetchMessages(dialog._id));
  };

  useEffect(() => {
    if (!dialog || !user || !userID) { return; }
    dispatch(fetchMessages(dialog._id));
    const creds = [dialog._id, user?.login];
    socket.emit(socketEvents.joinDialog, ...creds);
    socket.emit(
      socketEvents.updateMessagesHasRead,
      user._id, dialog._id, user?.login, getAuthorOrCompanionDependsOnUserID(userID, dialog),
    );
    socket.on(socketEvents.updateMessagesHasRead, listenUpdateMessagesHasRead);
    socket.on(socketEvents.sendMessage, listenSendMessage);
    socket.on(socketEvents.deleteMessage, listenDeleteMessage);
    return () => {
      socket.emit(socketEvents.leaveDialog, ...creds);
      socket.off(socketEvents.updateMessagesHasRead, listenUpdateMessagesHasRead);
      socket.off(socketEvents.sendMessage, listenSendMessage);
      socket.off(socketEvents.deleteMessage, listenDeleteMessage);
    };
  }, [dialog?._id]);

  useEffect(() => {
    listenOnline();
    const onlineInterval = setInterval(listenOnline, 60 * 1000);
    return () => {
      clearInterval(onlineInterval);
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
      < div className="message-list__header message-list-header" >
        <div className="message-list__goback" onClick={goBack}>
          <ArrowLeftOutlined />
        </div>
        <div className="message-list-header__body">
          <Avatar
            user={dialog.companion}
            classNames="message-list-header__avatar"
            hideOnline
          />
          <div className="message-list-header__content">
            <div className="message-list-header__title">
              {dialog && userID &&
                getFullName(getAuthorOrCompanionDependsOnUserID(userID, dialog))}
            </div>
            <div className="message-list-header__subtitle">
              {isOnline ?
                <React.Fragment>
                  <div className="message-list-header__online message-online-icon">
                    <div className="message-online-icon__body" />
                  </div>
                  <p>Online</p>
                </React.Fragment> :
                <p>
                  Заходил {
                    userID && formatDistanceToNow(new Date(getAuthorOrCompanionDependsOnUserID(userID, dialog).lastVisited),
                      { addSuffix: true, locale: ruLocale })
                  }
                </p>
              }
            </div>
          </div>
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