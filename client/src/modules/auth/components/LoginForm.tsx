import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { login as loginUser } from "store/auth/actionCreators";

interface FormValuesType {
  login: string,
  password: string,
}

const requireMes = "Это обязательное поле";

const validationSchema = yup.object({
  login: yup.string().required(requireMes),
  password: yup.string().required(requireMes),
});

const LoginForm: React.FC = () => {
  const [passwordInputType, setPasswordInputType] = useState("password");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    onSubmit: values => handleSubmit(values),
    validationSchema,
  });

  const handleSubmit = (values: FormValuesType) => {
    const { login, password } = values;
    dispatch(loginUser(login, password));
  };

  const switchPasswordVisibility = () => {
    setPasswordInputType(prev => prev === "password" ? "text" : "password");
  };

  return (
    <form noValidate className="auth-form" onSubmit={formik.handleSubmit}>
      <div className="auth-form__header">
        <h1 className="auth-form__title">Авторизация</h1>
        <p className="auth-form__subtitle">Пожалуйста войдите в свой аккаунт</p>
      </div>
      <div className="auth-form__content">

        <div className="auth-form__input auth-input">
          <input
            className="input auth-input__body"
            type="text"
            name="login"
            onChange={formik.handleChange}
            value={formik.values.login}
            placeholder="Введите логин/e-mail"
          />
          <div className="auth-input__error">{formik.errors.login}</div>
        </div>

        <div className="auth-form__input auth-input password-input">
          <input
            className="input auth-input__body"
            type={passwordInputType}
            autoComplete="on"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Введите пароль"
          />
          <div className="auth-input__error">{formik.errors.password}</div>
          <div
            className={passwordInputType === "password" ?
              "password-input__suffix" :
              "password-input__suffix password-input__suffix_strikethrough"}
            onClick={switchPasswordVisibility}>
          </div>
        </div>
        <button className="auth-form__btn"
          type="submit">Войти в аккаунт</button>
        <Link to="/registration" className="auth-form__link">Еще не зарегистрированы?</Link>
      </div>
    </form>
  );
};

export default LoginForm;