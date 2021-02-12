import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

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
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    onSubmit: values => handleSubmit(values),
    validationSchema,
  });

  const handleSubmit = (values: FormValuesType) => {
    console.log("handleSubmit", values);
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
        <div className="input">
          <input
            className="input__content auth-form__input"
            type="text"
            name="login"
            onChange={formik.handleChange}
            value={formik.values.login}
            placeholder="Введите логин/e-mail"
          />
          <div className="input__error">{formik.errors.login}</div>
        </div>
        <div className="input">
          <input
            className="input__content auth-form__input"
            type={passwordInputType}
            autoComplete="on"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Введите пароль"
          />
          <div className="input__error">{formik.errors.password}</div>
          <div
            className={passwordInputType === "password" ?
              "input__password-suffix" :
              "input__password-suffix input__password-suffix_strikethrough"}
            onClick={switchPasswordVisibility}>

          </div>
        </div>
        <button className="auth-form__btn"
          type="submit">Войти в аккаунт</button>
        <Link to="/reg" className="auth-form__link">Еще не зарегистрированы?</Link>
      </div>
    </form>
  );
};

export default LoginForm;