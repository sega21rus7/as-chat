import React from "react";
import { Form, Input, Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "store/auth/thunkCreators";
import { useSelector } from "tools/hooks";

interface IFormValues {
  email: string,
  login: string,
  password: string,
  repeatPassword: string,
}

const requireMes = "Это обязательное поле";

const RegForm: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(state => state.auth.authLoading);
  const error = useSelector(state => state.auth.authError);

  const handleSubmit = (values: IFormValues) => {
    const { email, login, password, repeatPassword } = values;
    dispatch(register(login, email, password, repeatPassword));
    if (!error) {
      history.push("/im");
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-card__header">
        <h1 className="auth-card__title">Регистрация</h1>
        <p className="auth-card__subtitle">Пожалуйста зарегистрируйтесь</p>
      </div>
      <Form
        className="auth-form"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="login"
          rules={[
            { required: true, message: requireMes },
            { min: 3, message: "Минимальная длина логина 3 символа" },
          ]}
        >
          <Input placeholder="Введите логин" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: requireMes },
            { type: "email", message: "Неверный формат e-mail" },
          ]}
        >
          <Input placeholder="Введите e-mail" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: requireMes },
            { min: 5, message: "Минимальная длина пароля 5 символов" },
          ]}
        >
          <Input.Password autoComplete="on" placeholder="Придумайте пароль" />
        </Form.Item>

        <Form.Item
          name="repeatPassword"
          rules={[
            { required: true, message: requireMes },
            { min: 5, message: "Минимальная длина пароля 5 символов" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли должны совпадать!"));
              },
            }),
          ]}
        >
          <Input.Password autoComplete="on" placeholder="Повторите пароль" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
      <Link to="/login" className="auth-card__link">Уже зарегистрированы?</Link>
    </div>
  );
};

export default RegForm;