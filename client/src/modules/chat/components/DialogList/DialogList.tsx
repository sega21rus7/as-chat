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
import { getFiltetedDialogs } from "store/dialogs/selectors";
import { useSelector } from "tools/hooks";
import { IDialog } from "tools/interfaces";
import CreateDialogButton from "./CreateDialogButton/CreateDialogButton";
import CreateDialogPopup from "./CreateDialogPopup/CreateDialogPopup";
import socketEvents from "core/socket/events";
import { Empty, Spin } from "antd";

const DialogList: React.FC = () => {
  const dispatch = useDispatch();
  const userID = useSelector(state => state.auth.user?._id);
  const dialogs = useSelector(state => getFiltetedDialogs(state.dialogs, userID));
  const loading = useSelector(state => state.dialogs.fetchDialogsLoading);
  const [createPopupVisible, setCreatePopupVisible] = useState(false);

  const listenDialog = (dialog: IDialog) => {
    if (dialog.companion._id === userID) {
      dispatch(dialogsActionCreators.addDialog(dialog));
    }
  };

  const listenCreateMessage = () => {
    dispatch(fetchDialogs());
  };

  const listenDeleteMessage = (_: never, isLast: boolean) => {
    isLast && dispatch(fetchDialogs());
  };

  useEffect(() => {
    dispatch(fetchDialogs());
    socket.on(socketEvents.DIALOG_CREATED, listenDialog);
    // todo обновлять список только у создателя диалога и его собеседника
    socket.on(socketEvents.MESSAGE_CREATED, listenCreateMessage);
    socket.on(socketEvents.MESSAGE_DELETED, listenDeleteMessage);
    return () => {
      socket.removeListener(socketEvents.DIALOG_CREATED, listenDialog);
      socket.removeListener(socketEvents.MESSAGE_CREATED, listenCreateMessage);
      socket.removeListener(socketEvents.MESSAGE_DELETED, listenDeleteMessage);
    };
  }, []);

  const openCreatePopup = () => {
    setCreatePopupVisible(true);
  };
  const closeCreatePopup = () => {
    setCreatePopupVisible(false);
  };

  return (
    <div className="dialog-list">
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