/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Dialog from "./Dialog/Dialog";
import "./dialog_list.scss";
import socket from "core/socket";
import SearchForm from "./SearchForm/SearchForm";
import BurgerIcon from "./BurgerIcon/BurgerIcon";
import { useDispatch } from "react-redux";
import { addDialog, fetchDialogs } from "store/dialogs/actionCreators";
import { useSelector } from "tools/hooks";
import { DialogType } from "tools/interfaces";
import CreateDialogIcon from "./CreateDialogIcon/CreateDialogIcon";
import Popup from "tools/components/Popup/Popup";
import CreateDialog from "./CreateDialog/CreateDialog";

const DialogList: React.FC = () => {
  const dispatch = useDispatch();
  const dialogs = useSelector(state => state.dialogs.items);
  const userID = useSelector(state => state.auth.user?._id);
  const [createPopupVisible, setCreatePopupVisible] = useState(false);

  const listenDialog = (dialog: DialogType) => {
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
        <BurgerIcon className="dialog-list__burger-icon" />
        <SearchForm className="dialog-list__search-form" />
        <CreateDialogIcon
          className="dialog-list__create-dialog-icon"
          openCreatePopup={openCreatePopup}
        />
      </div>
      {
        dialogs.sort((a, b) => {
          return new Date(a.updatedAt).getTime() < new Date(b.updatedAt).getTime() ? 1 : -1;
        }).map(item => <Dialog
          className="dialog-list__item"
          key={item._id}
          item={item}
        />)
      }
      {createPopupVisible && <Popup
        hide={closeCreatePopup}
        component={<CreateDialog hide={closeCreatePopup} />}
      />}
    </div>
  );
};

export default DialogList;