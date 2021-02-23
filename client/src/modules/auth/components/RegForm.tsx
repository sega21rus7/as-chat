import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "store/auth/actionCreators";
import { useSelector } from "tools/hooks";

interface FormValuesType {
  email: string,
  login: string,
  password: string,
  repeatPassword: string,
}

const requireMes = "Это обязательное поле";

const validationSchema = yup.object({
  login: yup
    .string()
    .required(requireMes)
    .min(3, "Минимальная длина логина 3 символа"),
  email: yup
    .string()
    .required(requireMes)
    .email("Неверной формат e-mail"),
  password: yup
    .string()
    .required(requireMes)
    .min(5, "Минимальная длина пароля 5 символов"),
  repeatPassword: yup
    .string()
    .required(requireMes)
    .min(5, "Минимальная длина пароля 5 символов")
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
});

const RegForm: React.FC = () => {
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [repeatPasswordInputType, setRepeatPasswordInputType] = useState("password");
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector(state => state.auth.error);

  const formik = useFormik({
    initialValues: {
      email: "",
      login: "",
      password: "",
      repeatPassword: "",
    },
    onSubmit: values => handleSubmit(values),
    validationSchema,
  });

  const handleSubmit = (values: FormValuesType) => {
    const { email, login, password, repeatPassword } = values;
    dispatch(register(email, login, password, repeatPassword));
    if (!error) {
      history.push("/im");
    }
  };

  const switchPasswordVisibility = () => {
    setPasswordInputType(prev => prev === "password" ? "text" : "password");
  };

  const switchRepeatPasswordVisibility = () => {
    setRepeatPasswordInputType(prev => prev === "password" ? "text" : "password");
  };

  return (
    <form noValidate className="auth-form" onSubmit={formik.handleSubmit}>
      <div className="auth-form__header">
        <h1 className="auth-form__title">Регистрация</h1>
        <p className="auth-form__subtitle">Пожалуйста зарегистрируйтесь</p>
      </div>
      <div className="auth-form__content">
        <div className="auth-form__input auth-input">
          <input className="input auth-input__body"
            type="text"
            name="login"
            onChange={formik.handleChange}
            value={formik.values.login}
            placeholder="Введите логин"
          />
          <div className="auth-input__error">{formik.errors.login}</div>
        </div>

        <div className="auth-form__input auth-input">
          <input className="input auth-input__body"
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Введите e-mail"
          />
          <div className="auth-input__error">{formik.errors.email}</div>
        </div>

        <div className="auth-form__input auth-input password-input">
          <input className="input auth-input__body"
            type={passwordInputType}
            autoComplete="on"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Придумайте пароль"
          />
          <div className="auth-input__error">{formik.errors.password}</div>
          <div
            className={passwordInputType === "password" ?
              "password-input__suffix" :
              "password-input__suffix password-input__suffix_strikethrough"}
            onClick={switchPasswordVisibility}></div>
        </div>

        <div className="auth-form__input auth-input password-input">
          <input className="input auth-input__body"
            type={repeatPasswordInputType}
            autoComplete="on"
            name="repeatPassword"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            placeholder="Повторите пароль"
          />
          <div className="auth-input__error">{formik.errors.repeatPassword}</div>
          <div
            className={repeatPasswordInputType === "password" ?
              "password-input__suffix" :
              "password-input__suffix password-input__suffix_strikethrough"}
            onClick={switchRepeatPasswordVisibility}></div>
        </div>
        <button className="auth-form__btn"
          type="submit">Зарегистрироваться</button>
        <Link to="/login" className="auth-form__link">Уже зарегистрированы?</Link>
      </div>
    </form>
  );
};

export default RegForm;