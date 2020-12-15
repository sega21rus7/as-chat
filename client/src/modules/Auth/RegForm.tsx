import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { customFetch } from "../../tools";
import { IProps, IFormValues } from "./interfaces";
import { passRules, loginRules, emailRules } from "./rules";

const RegForm: React.FC<IProps> = props => {
  const onFinish = async (values: IFormValues) => {
    const { password, password2 } = values;
    if (password !== password2) {
      return message.error("Пароли должны совпадать!");
    }
    try {
      const res = await customFetch("/api/auth/register", values);
      console.log("res", res);
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
      name="email"
      rules={emailRules}
    >
      <Input prefix={<MailOutlined />}
        placeholder="Email"
        type="email"
      />
    </Form.Item>
    <Form.Item
      name="login"
      rules={loginRules}
    >
      <Input
        prefix={<UserOutlined />}
        placeholder="Логин"
      />
    </Form.Item>
    <Form.Item
      name="password"
      rules={passRules}
    >
      <Input
        prefix={<LockOutlined />}
        type="password"
        autoComplete="on"
        placeholder="Пароль"
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
        placeholder="Повторите пароль"
      />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" style={{ marginRight: 5 }}>
        Зарегистрироваться
      </Button>
      Или <a role="button" onClick={() => {
        props.setIsLogin(true);
      }}>войдите в систему</a>
    </Form.Item>
  </Form>;
};

export default RegForm;