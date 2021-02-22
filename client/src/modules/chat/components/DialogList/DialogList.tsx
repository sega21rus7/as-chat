/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import DialogListItem from "./DialogListItem/DialogListItem";
import "./dialog_list.scss";
import SearchForm from "./SearchForm/SearchForm";
import BurgerIcon from "./BurgerIcon/BurgerIcon";
import { useDispatch } from "react-redux";
import { fetchDialogs } from "store/dialogs/actionCreators";
import { useSelector } from "tools/hooks";

const DialogList: React.FC = () => {
  const dispatch = useDispatch();
  const dialogs = useSelector(state => state.dialogs.items);

  useEffect(() => {
    dispatch(fetchDialogs());
    console.log(dialogs);
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
          key={item.companion._id}
          user={item.author}
          message={item.messages[0]}
          date={item.updatedAt}
          hasRead={item.messages[0].hasRead}
        />)
      }
    </div>
  );
};

export default DialogList;