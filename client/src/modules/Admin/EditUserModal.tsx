import React from "react";
import { Modal, Input, Form, Button, message } from "antd";
import { loginRules } from "../Auth/rules";
import { IUser } from "./interfaces";

interface IProps {
  visible: boolean;
  setVisible(value: boolean): void;
  user?: IUser;
}

const EditUserModal: React.FC<IProps> = props => {
  const [form] = Form.useForm();

  const editUserFromModal = async () => {
    try {
      const values = await form.validateFields();
      console.log("values", values);
    } catch (err) {
      console.log("err", err);
      message.error(err);
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
      footer={[
        <Button key="back" onClick={cancelModal}>
          Закрыть
        </Button>,
        <Button key="submit" type="primary" onClick={editUserFromModal}>
          Применить
        </Button>,
      ]}
    >
      <Form
        form={form}
        initialValues={{
          email: props.user?.email,
          login: props.user?.login,
        }}
      >
        <Form.Item
          name="email"
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
    </Modal>
  );
};

export default EditUserModal;