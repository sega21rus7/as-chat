import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { jsonFetch } from "tools";
import { IKeyStringValueString } from "tools/interfaces";
import { IProps, ILoginResponse } from "./interfaces";
import { passRules, loginRules, emailRules } from "./rules";

const RegForm: React.FC<IProps> = props => {
  const history = useHistory();

  const register = async (values: IKeyStringValueString) => {
    const { password, password2 } = values;
    if (password !== password2) {
      return message.error("Пароли должны совпадать!");
    }
    try {
      await jsonFetch("/api/auth/register", values);
      await jsonFetch("/api/auth/login", values) as ILoginResponse;
      history.push("/admin/users");
    } catch (err) {
      message.error(err.message);
    }
  };

  return <Form
    className="auth-form"
    onFinish={register}
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
      <Input.Password
        prefix={<LockOutlined />}
        autoComplete="on"
        placeholder="Пароль"
      />
    </Form.Item>
    <Form.Item
      name="password2"
      rules={passRules}
    >
      <Input.Password
        prefix={<LockOutlined />}
        autoComplete="on"
        placeholder="Повторите пароль"
      />
    </Form.Item>
    <Form.Item>
      <Button
        className="auth-form__submit"
        type="primary"
        htmlType="submit"
        block
      >
        Зарегистрироваться
      </Button>
      <a
        className="auth-form__switch"
        role="button"
        onClick={() => props.setIsLogin(true)}
      >
        Войти в систему
      </a>
    </Form.Item>
  </Form>;
};

export default RegForm;