/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Dialog from "./Dialog/Dialog";
import "./dialog_list.scss";
import socket from "core/socket";
import SearchForm from "./SearchForm/SearchForm";
import BurgerIcon from "./BurgerIcon/BurgerIcon";
import { useDispatch } from "react-redux";
import { addDialog, fetchDialogs } from "store/dialogs/actionCreators";
import { getFiltetedDialogs } from "store/dialogs/selectors";
import { useSelector } from "tools/hooks";
import { IDialog } from "tools/interfaces";
import CreateDialogButton from "./CreateDialogButton/CreateDialogButton";
import CreateDialogPopup from "./CreateDialogPopup/CreateDialogPopup";

const DialogList: React.FC = () => {
  const dispatch = useDispatch();
  const userID = useSelector(state => state.auth.user?._id);
  const dialogs = useSelector(state => getFiltetedDialogs(state.dialogs, userID));
  const [createPopupVisible, setCreatePopupVisible] = useState(false);

  const listenDialog = (dialog: IDialog) => {
    if (dialog.author._id !== userID) {
      dispatch(addDialog(dialog));
    }
  };

  useEffect(() => {
    dispatch(fetchDialogs());
    socket.on("DIALOG_CREATED", listenDialog);
    return () => {
      socket.removeListener("DIALOG_CREATED", listenDialog);
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
        dialogs && dialogs.sort((a, b) => {
          return new Date(a.updatedAt).getTime() < new Date(b.updatedAt).getTime() ? 1 : -1;
        }).map(item => <Dialog
          className="dialog-list__item"
          key={item._id}
          item={item}
        />)
      }
      <CreateDialogPopup visible={createPopupVisible} hide={closeCreatePopup} />
    </div>
  );
};

export default DialogList;