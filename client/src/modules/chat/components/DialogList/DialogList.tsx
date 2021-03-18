/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Dialog from "./Dialog/Dialog";
import "./dialog_list.scss";
import socket from "core/socket";
import SearchForm from "./SearchForm/SearchForm";
import BurgerIcon from "./BurgerIcon/BurgerIcon";
import { useDispatch } from "react-redux";
import { fetchDialogs } from "store/dialogs/thunkCreators";
import dialogsActionCreators from "store/dialogs/actionCreators";
import messagesActionCreators from "store/messages/actionCreators";
import { getFiltetedDialogs } from "store/dialogs/selectors";
import { useSelector } from "tools/hooks";
import { IDialog, IMessage } from "tools/interfaces";
import CreateDialogButton from "./CreateDialogButton/CreateDialogButton";
import CreateDialogPopup from "./CreateDialogPopup/CreateDialogPopup";
import socketEvents from "core/socket/events";
import { Empty, Spin } from "antd";

interface ITyping {
  dialogID: string;
  message?: string;
}

const DialogList: React.FC = () => {
  const dispatch = useDispatch();
  const userID = useSelector(state => state.auth.user?._id);
  const dialogs = useSelector(state => getFiltetedDialogs(state.dialogs, userID));
  const currentDialogID = useSelector(state => state.dialogs.currentDialog?._id);
  const loading = useSelector(state => state.dialogs.fetchDialogsLoading);
  const [createPopupVisible, setCreatePopupVisible] = useState(false);
  const [typing, setTyping] = useState<null | ITyping>(null);

  const listenCreateDialog = (dialog: IDialog) => {
    dispatch(dialogsActionCreators.addDialog(dialog));
  };

  const listenDeleteDialog = (dialog: IDialog) => {
    dispatch(dialogsActionCreators.removeDialog(dialog));
    dispatch(dialogsActionCreators.setCurrentDialog(null));
    dispatch(messagesActionCreators.resetMessages());
  };

  const listenSendMessage = (message: IMessage) => {
    dispatch(fetchDialogs());
  };

  const listenDeleteMessage = (message: IMessage, isLast: boolean) => {
    isLast && dispatch(fetchDialogs());
  };

  const listenTypingMessage = (dialogID: string, message: string) => {
    setTyping({ dialogID, message });
  };

  const listenStopTypingMessage = (dialogID: string) => {
    setTyping(null);
  };

  useEffect(() => {
    dispatch(fetchDialogs());
    socket.on(socketEvents.createDialog, listenCreateDialog);
    socket.on(socketEvents.deleteDialog, listenDeleteDialog);
    socket.on(socketEvents.sendMessage, listenSendMessage);
    socket.on(socketEvents.deleteMessage, listenDeleteMessage);
    socket.on(socketEvents.typingMessage, listenTypingMessage);
    socket.on(socketEvents.stopTypingMessage, listenStopTypingMessage);
    return () => {
      socket.off(socketEvents.createDialog, listenCreateDialog);
      socket.off(socketEvents.deleteDialog, listenDeleteDialog);
      socket.off(socketEvents.sendMessage, listenSendMessage);
      socket.off(socketEvents.deleteMessage, listenDeleteMessage);
      socket.off(socketEvents.stopTypingMessage, listenStopTypingMessage);
    };
  }, []);

  const openCreatePopup = () => {
    setCreatePopupVisible(true);
  };
  const closeCreatePopup = () => {
    setCreatePopupVisible(false);
  };

  return (
    <div className={currentDialogID ? "dialog-list dialog-list_invisible-md" : "dialog-list"}>
      <div className="dialog-list__header">
        <BurgerIcon />
        <SearchForm />
        <CreateDialogButton openCreatePopup={openCreatePopup} />
      </div>
      {
        loading ? <div className="dialog-list__no">
          <Spin />
        </div> :
          !dialogs?.length ? <div className="dialog-list__no">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Диалогов не найдено"
            />
          </div> :
            dialogs.sort((a, b) => {
              return new Date(a.updatedAt).getTime() < new Date(b.updatedAt).getTime() ? 1 : -1;
            }).map(item => <Dialog
              typingText={typing && item._id === typing.dialogID ? typing.message : undefined}
              key={item._id}
              item={item}
            />)
      }
      <CreateDialogPopup visible={createPopupVisible} hide={closeCreatePopup} />
    </div>
  );
};

export default DialogList;