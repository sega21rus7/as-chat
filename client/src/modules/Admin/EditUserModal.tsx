import React from "react";
import { Modal, Input, Form, message } from "antd";
import { loginRules, emailRules } from "../auth/rules";
import { IUser } from "./interfaces";
import { jsonTokenFetch } from "../../tools";

interface IProps {
  visible: boolean;
  setVisible(value: boolean): void;
  user: IUser;
  updateUsers(): void;
}

const EditUserModal: React.FC<IProps> = props => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.resetFields();
  }, [props.user]);

  const editUserFromModal = async () => {
    const values = await form.validateFields();
    if (
      values.login === props.user.login &&
      values.email === props.user.email &&
      values.lastName === props.user.lastName &&
      values.firstName === props.user.firstName &&
      values.middleName === props.user.middleName
    ) {
      message.error("Хотя бы одно из значений должно отличаться!");
      return;
    }
    const data = {
      ...values,
      _id: props.user._id,
    };
    try {
      const res = await jsonTokenFetch("/api/admin/user/edit", data);
      props.updateUsers();
      cancelModal();
      message.success(res);
    } catch (err) {
      console.log("err", err);
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
      okText="Сохранить"
      cancelText="Закрыть"
    >
      <Form labelCol={{ span: 4 }}
        form={form}
        initialValues={{
          login: props.user.login,
          email: props.user.email,
          lastName: props.user.lastName,
          firstName: props.user.firstName,
          middleName: props.user.middleName,
        }}>
        <Form.Item
          name="email"
          label="Email"
          rules={emailRules}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          name="login"
          label="Логин"
          rules={loginRules}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Фамилия"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="firstName"
          label="Имя"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="middleName"
          label="Отчество"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal >
  );
};

export default EditUserModal;