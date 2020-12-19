import React from "react";
import { Form, Input, Button, message } from "antd";
import { emailRules, loginRules } from "../auth/rules";
import { customTokenFetch } from "../../tools";
import { IFormValues } from "../../tools/interfaces";

export interface IUser {
  email: string;
  login: string;
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
}

export interface IEditUserResponse {
  user: IUser,
}

const EditUserForm: React.FC = () => {
  const [user, setUser] = React.useState<IUser>();
  const [form] = Form.useForm();

  React.useEffect(() => {
    getUser();
  }, []);

  React.useEffect(() => {
    form.resetFields();
  }, [user]);

  const getUser = async () => {
    const res = await customTokenFetch("/api/profile/user/info", undefined, {
      method: "GET",
    }) as IEditUserResponse;
    setUser(res.user);
  };

  const editUser = async (values: IFormValues) => {
    try {
      const res = await customTokenFetch("/api/profile/user/edit", values);
      message.success(res);
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <Form
      form={form}
      style={{
        minWidth: 500,
      }}
      labelCol={{ span: 4 }}
      initialValues={{
        email: user?.email,
        login: user?.login,
        lastName: user?.lastName,
        firstName: user?.firstName,
        middleName: user?.middleName,
      }}
      onFinish={editUser}
    >
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
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button type="primary" htmlType="submit" style={{ marginRight: 5 }}>
          Сохранить
        </Button>
      </Form.Item>
    </Form >
  );
};

export default EditUserForm;