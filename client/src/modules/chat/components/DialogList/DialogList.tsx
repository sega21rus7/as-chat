/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import DialogListItem from "./DialogListItem/DialogListItem";
import "./dialog_list.scss";
import socket from "core/socket";
import SearchForm from "./SearchForm/SearchForm";
import BurgerIcon from "./BurgerIcon/BurgerIcon";
import { useDispatch } from "react-redux";
import { addDialog, fetchDialogs } from "store/dialogs/actionCreators";
import { useSelector } from "tools/hooks";
import { DialogType } from "tools/interfaces";

const DialogList: React.FC = () => {
  const dispatch = useDispatch();
  const dialogs = useSelector(state => state.dialogs.items);

  useEffect(() => {
    dispatch(fetchDialogs());
    socket.on("DIALOG_CREATED", (dialog: DialogType) => {
      dispatch(addDialog(dialog));
    });
  }, []);

  return (
    <div className="dialog-list">
      <div className="dialog-list__header">
        <BurgerIcon />
        <SearchForm />
      </div>
      {
        dialogs.sort((a, b) => {
          return new Date(a.updatedAt).getTime() < new Date(b.updatedAt).getTime() ? 1 : -1;
        }).map(item => <DialogListItem
          key={item._id}
          dialog={item}
        />)
      }
    </div>
  );
};

export default DialogList;