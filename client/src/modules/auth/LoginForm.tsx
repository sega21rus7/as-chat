import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { jsonFetch } from "tools";
import { IKeyStringValueString } from "tools/interfaces";
import { IProps, ILoginResponse } from "./interfaces";
import { passRules, loginRules } from "./rules";

const LoginForm: React.FC<IProps> = props => {
  const history = useHistory();

  const login = async (values: IKeyStringValueString) => {
    try {
      await jsonFetch("/api/auth/login", values) as ILoginResponse;
      history.push("/admin/users");
    } catch (err) {
      message.error(err.message);
    }
  };

  return <Form
    onFinish={login}
    className="auth-form"
  >
    <Form.Item
      name="login"
      rules={loginRules}
    >
      <Input prefix={<UserOutlined />}
        placeholder="Логин" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={passRules}
    >
      <Input.Password
        prefix={<LockOutlined />}
        autoComplete="on"
        placeholder="Пароль"
      />
    </Form.Item>
    <Form.Item>
      <Button
        className="auth-form__submit"
        type="primary"
        htmlType="submit"
        block
      >
        Войти в аккаунт
      </Button>
      <a
        className="auth-form__switch"
        role="button"
        onClick={() => props.setIsLogin(false)}
      >
        Зарегистрироваться
      </a>
    </Form.Item>
  </Form >;
};

export default LoginForm;