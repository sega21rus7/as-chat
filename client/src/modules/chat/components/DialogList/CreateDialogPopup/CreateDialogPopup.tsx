/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./create_dialog_popup.scss";
import { Modal, Form, Input, Radio, message, RadioChangeEvent } from "antd";
import { useDispatch } from "react-redux";
import { fetchUsers } from "store/createDialogUsers/actionCreators";
import { getFullName } from "tools";
import { useSelector } from "tools/hooks";
import Avatar from "../../Avatar/Avatar";
import { postDialog } from "store/dialogs/actionCreators";

interface PropsType {
  visible: boolean;
  hide(): void;
}
interface FormValuesType {
  message: string;
}

const CreateDialogPopup: React.FC<PropsType> = ({ visible, hide }) => {
  const [form] = Form.useForm();
  const [selectedUser, setSelectedUser] = useState("");
  const dispatch = useDispatch();
  const users = useSelector(state => state.createDialogUsers.users);

  const handleSubmit = (values: FormValuesType) => {
    const { message } = values;
    dispatch(postDialog(selectedUser, message));
    hide();
  };

  const onOk = async () => {
    try {
      const values = await form.validateFields();
      form.resetFields();
      handleSubmit(values);
    } catch (err) {
      message.error(err);
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleRadioChange = (e: RadioChangeEvent) => {
    setSelectedUser(e.target.value);
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
      <Input placeholder="Поиск..." />

      <div className="user-list">
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
            <Radio value={user._id}
              checked={user._id === selectedUser}
              onChange={handleRadioChange}
            />
          </li>)}
      </div>

      <Form form={form}>
        <Form.Item
          name="message"
          rules={[{ required: true, message: "Эот обязательное поле" }]}
        >
          <Input placeholder="Введите текст сообщения..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateDialogPopup;