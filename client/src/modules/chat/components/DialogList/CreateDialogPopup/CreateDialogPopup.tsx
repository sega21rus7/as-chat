/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./create_dialog_popup.scss";
import { Modal, Form, Input, message, Pagination } from "antd";
import { useDispatch } from "react-redux";
import { fetchUsers } from "store/createDialogUsers/thunkCreators";
import { getFullName } from "tools";
import { useSelector } from "tools/hooks";
import Avatar from "../../Avatar/Avatar";
import { postDialog } from "store/dialogs/thunkCreators";

interface IProps {
  visible: boolean;
  hide(): void;
}
interface IFormValues {
  text: string;
}

const pageSize = 5;

const CreateDialogPopup: React.FC<IProps> = ({ visible, hide }) => {
  const [page, setPage] = useState(1);
  const [selectedUserID, setSelectedUserID] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const users = useSelector(state => state.createDialogUsers.users);

  const handleSubmit = (values: IFormValues) => {
    if (!selectedUserID) {
      return message.error("Не выбран собеседник!");
    }
    const { text } = values;
    dispatch(postDialog(selectedUserID, text));
    hide();
  };

  const paginate = (page: number) => {
    setPage(page);
  };

  const onOk = async () => {
    try {
      const values = await form.validateFields();
      form.resetFields();
      handleSubmit(values);
    } catch (err) {
      message.error(err.errorFields[0].errors[0] || err.message || err);
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { _id } = e.currentTarget.dataset;
    _id && setSelectedUserID(_id);
  };

  return (
    <Modal
      className="create-dialog-popup"
      visible={visible}
      title="Новое сообщение"
      okText="Отправить"
      cancelText="Закрыть"
      onCancel={hide}
      onOk={onOk}
    >
      <Input placeholder="Найти пользователей..." />

      <div className="user-list">
        {users?.slice(page === 1 ? 0 : pageSize * page - pageSize, pageSize * page).map(user =>
          <li
            className={
              selectedUserID === user._id ?
                "user-list__item user-item user-item_selected" :
                "user-list__item user-item"
            }
            key={user._id}
            data-_id={user._id}
            onClick={handleClick}
          >
            <div className="user-item__body">
              <div className="user-item__avatar">
                <Avatar user={user} />
              </div>
              <div className="user-item__name">{getFullName(user)}</div>
            </div>
          </li>)}
        <Pagination
          defaultCurrent={1}
          total={users?.length}
          showSizeChanger={false}
          pageSize={pageSize}
          responsive
          onChange={paginate}
        />
      </div>

      <Form form={form}>
        <Form.Item
          name="text"
          rules={[{ required: true, message: "Это обязательное поле" }]}
        >
          <Input placeholder="Введите текст сообщения..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateDialogPopup;