/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./create_dialog.scss";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { fetchUsers } from "store/createDialogUsers/actionCreators";
import { getFullName } from "tools";
import { useSelector } from "tools/hooks";
import Avatar from "../../Avatar/Avatar";
import { postDialog } from "store/dialogs/actionCreators";

interface PropsType {
  hide(): void;
}
interface FormValuesType {
  message: string;
}

const validationSchema = yup.object({
  message: yup.string().required("Это обязательное поле"),
});

const CreateDialog: React.FC<PropsType> = ({ hide }) => {
  const [selectedUserID, setSelectedUserID] = useState("");
  const dispatch = useDispatch();
  const users = useSelector(state => state.createDialogUsers.users);

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: values => handleSubmit(values),
    validationSchema,
  });

  const handleSubmit = (values: FormValuesType) => {
    const { message } = values;
    dispatch(postDialog(selectedUserID, message));
    hide();
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUserID(e.target.value);
  };

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
        <div className="user-list__items">
          {users?.map(user =>
            <li
              className="user-list__item user-item"
              key={user._id}
            >
              <div className="user-item__body">
                <div className="user-item__avatar">
                  <Avatar user={user} />
                </div>
                <div className="user-item__name">{getFullName(user)}</div>
              </div>
              <input
                type="radio"
                value={user._id}
                checked={user._id === selectedUserID}
                onChange={handleRadioChange}
              />
            </li>)}
        </div>
      </div>
      <form className="create-dialog__form" noValidate onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="message"
          onChange={formik.handleChange}
          value={formik.values.message}
          className="input create-dialog__input"
          placeholder="Введите сообщение..."
        />
        <div className="auth-input__error">{formik.errors.message}</div>
        <button type="submit" className="create-dialog__button">Отправить</button>
      </form>
    </div >
  );
};

export default CreateDialog;