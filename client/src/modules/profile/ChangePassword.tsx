import React from "react";
import { Form, Input, Button, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { passRules } from "../auth/rules";
import { customTokenFetch } from "../../tools";
import { IFormValues } from "../../tools/interfaces";

const ChangePassword: React.FC = () => {
  const onFinish = async (values: IFormValues) => {
    if (values.password1 !== values.password2) {
      return message.error("Пароли должны совпадать!");
    }
    try {
      const res = await customTokenFetch("/api/profile/change_password", values);
      message.success(res);
    } catch (err) {
      message.error(err.message);
    }
  };

  return <Form
    style={{
      width: 500,
      margin: "0 auto",
    }}
    onFinish={onFinish}
  >
    <Form.Item
      name="old_password"
      rules={passRules}
    >
      <Input
        prefix={<LockOutlined />}
        type="password"
        autoComplete="on"
        placeholder="Старый пароль"
      />
    </Form.Item>
    <Form.Item
      name="password1"
      rules={passRules}
    >
      <Input
        prefix={<LockOutlined />}
        type="password"
        autoComplete="on"
        placeholder="Новый пароль"
      />
    </Form.Item>
    <Form.Item
      name="password2"
      rules={passRules}
    >
      <Input
        prefix={<LockOutlined />}
        type="password"
        autoComplete="on"
        placeholder="Подтвердите новый пароль"
      />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" style={{ marginRight: 5 }}>
        Изменить
      </Button>
    </Form.Item>
  </Form >;
};

export default ChangePassword;