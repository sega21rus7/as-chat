import React from "react";
import { Form, Input, Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as loginUser } from "store/auth/thunkCreators";
import { useSelector } from "tools/hooks";

interface IFormValues {
  login: string,
  password: string,
}

const requireMes = "Это обязательное поле";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.auth.authError);
  const history = useHistory();

  const handleSubmit = (values: IFormValues) => {
    const { login, password } = values;
    dispatch(loginUser(login, password));
    if (!error) {
      history.push("/im");
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-card__header">
        <h1 className="auth-card__title">Авторизация</h1>
        <p className="auth-card__subtitle">Пожалуйста войдите в свой аккаунт</p>
      </div>
      <Form
        className="auth-form"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="login"
          rules={[{ required: true, message: requireMes }]}
        >
          <Input placeholder="Введите логин/e-mail" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: requireMes }]}
        >
          <Input.Password autoComplete="on" placeholder="Введите пароль" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Войти в аккаунт
          </Button>
        </Form.Item>
      </Form>
      <Link to="/registration" className="auth-card__link">Еще не зарегистрированы?</Link>
    </div>
  );
};

export default LoginForm;
