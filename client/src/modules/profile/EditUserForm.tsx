import React from "react";
import { emailRules, loginRules } from "../auth/rules";
import { Form, Input } from "antd";

const EditUserForm: React.FC = () => {
  return (
    <Form labelCol={{ span: 4 }}>
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
  );
};

export default EditUserForm;