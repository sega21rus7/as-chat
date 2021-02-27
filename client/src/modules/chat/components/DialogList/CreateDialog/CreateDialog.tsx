/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "store/createDialog/actionCreators";
import ErrorAlert from "tools/components/ErrorAlert/ErrorAlert";
import { useSelector } from "tools/hooks";
import "./create_dialog.scss";

const CreateDialog: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.createDialog.users);
  const error = useSelector(state => state.createDialog.error);

  useEffect(() => {
    !users && dispatch(fetchUsers());
  }, []);

  return (
    <div className="create-dialog">
      <div className="create-dialog__header">
        <div className="create-dialog__title">Новое сообщение</div>
      </div>
      <div className="create-dialog__subheader">
        <div className="create-dialog__whom">Кому:</div>
        <form noValidate className="create-dialog__search">
          <input
            type="text"
            className="input create-dialog__input"
            placeholder="Поиск..."
          />
        </form>
      </div>
      <div className="create-dialog__user-list user-list">
        <div className="user-list__title">Список всех пользователей:</div>
        {error ?
          <ErrorAlert text={error} /> :
          <div className="user-list__list">
            <li className="user-list__item user-item">
              <img src="" alt="" className="user-item__avatar" />
              <div className="user-item__name"></div>
            </li>
          </div>}
      </div>
    </div>
  );
};

export default CreateDialog;