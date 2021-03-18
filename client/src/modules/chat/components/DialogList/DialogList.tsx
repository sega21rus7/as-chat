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

const DialogList: React.FC = () => {
  const dispatch = useDispatch();
  const userID = useSelector(state => state.auth.user?._id);
  const dialogs = useSelector(state => getFiltetedDialogs(state.dialogs, userID));
  const currentDialogID = useSelector(state => state.dialogs.currentDialog?._id);
  const loading = useSelector(state => state.dialogs.fetchDialogsLoading);
  const [createPopupVisible, setCreatePopupVisible] = useState(false);

  const listenCreateDialog = (dialog: IDialog) => {
    console.log("listenCreateDialog");
    dispatch(dialogsActionCreators.addDialog(dialog));
  };

  const listenDeleteDialog = (dialog: IDialog) => {
    console.log("listenDeleteDialog");
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

  useEffect(() => {
    dispatch(fetchDialogs());
    socket.on(socketEvents.CREATE_DIALOG, listenCreateDialog);
    socket.on(socketEvents.DELETE_DIALOG, listenDeleteDialog);
    socket.on(socketEvents.SEND_MESSAGE, listenSendMessage);
    socket.on(socketEvents.DELETE_MESSAGE, listenDeleteMessage);
    return () => {
      socket.off(socketEvents.CREATE_DIALOG, listenCreateDialog);
      socket.off(socketEvents.DELETE_DIALOG, listenDeleteDialog);
      socket.off(socketEvents.SEND_MESSAGE, listenSendMessage);
      socket.off(socketEvents.DELETE_MESSAGE, listenDeleteMessage);
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
              key={item._id}
              item={item}
            />)
      }
      <CreateDialogPopup visible={createPopupVisible} hide={closeCreatePopup} />
    </div>
  );
};

export default DialogList;