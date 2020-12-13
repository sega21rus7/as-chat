import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

interface IFormValues {
  [key: string]: string
}

interface IProps {
  requireMessage: string;
  setIsLogin(value: boolean): void;
}

const LoginForm: React.FC<IProps> = props => {
  const onFinish = (values: IFormValues) => {
    console.log("Received values of form: ", values);
  };

  return <Form
    style={{
      width: 500,
      margin: "0 auto",
    }}
    onFinish={onFinish}
  >
    <Form.Item
      name="username"
      rules={[{ required: true, message: props.requireMessage }]}
    >
      <Input prefix={<UserOutlined />}
        placeholder="Логин" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[{ required: true, message: props.requireMessage }]}
    >
      <Input
        prefix={<LockOutlined />}
        type="password"
        autoComplete="on"
        placeholder="Пароль"
      />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" style={{ marginRight: 5 }}>
        Войти
      </Button>
      Или <a role="button" onClick={() => {
        props.setIsLogin(false);
      }}>зарегистрируйтесь сейчас</a>
    </Form.Item>
  </Form >;
};

export default LoginForm;