import React from "react";
import { Modal, Input, Form, message } from "antd";
import { loginRules, emailRules } from "../Auth/rules";
import { IUser } from "./interfaces";
import { customFetch } from "../../tools";

interface IProps {
  visible: boolean;
  setVisible(value: boolean): void;
  user: IUser;
}

const EditUserModal: React.FC<IProps> = props => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    console.log("props.user", props.user);
  }, [props.user.email, props.user.login]);

  const editUserFromModal = async () => {
    const values = await form.validateFields();
    console.log("values", values);
    try {
      const res = await customFetch("/api/admin/user/edit", values);
      console.log("res", res);
    } catch (err) {
      message.error(err.message);
    }
  };

  const cancelModal = () => {
    props.setVisible(false);
  };

  return (
    <Modal title="Редактирование пользователя"
      visible={props.visible}
      onOk={editUserFromModal}
      onCancel={cancelModal}
      okText="Применить"
      cancelText="Закрыть"
    >
      <Form form={form} initialValues={{
        login: props.user.login,
        email: props.user.email,
      }}>
        <Form.Item
          name="email"
          rules={emailRules}
        >
          <Input
            placeholder="Email"
            type="email"
          />
        </Form.Item>
        <Form.Item
          name="login"
          rules={loginRules}
        >
          <Input
            placeholder="Логин"
          />
        </Form.Item>
      </Form>
    </Modal >
  );
};

export default EditUserModal;