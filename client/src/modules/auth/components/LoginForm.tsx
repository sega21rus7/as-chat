import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [passwordInputType, setPasswordInputType] = useState("password");

  const switchPasswordVisibility = () => {
    setPasswordInputType(prev => prev === "password" ? "text" : "password");
  };

  return (
    <form className="auth-form">
      <div className="auth-form__header">
        <h1 className="auth-form__title">Авторизация</h1>
        <p className="auth-form__subtitle">Пожалуйста войдите в свой аккаунт</p>
      </div>
      <div className="auth-form__content">
        <div className="input">
          <input
            className="input__content auth-form__input"
            type="text"
            placeholder="Введите логин/e-mail" />
        </div>
        <div className="input">
          <input
            className="input__content auth-form__input"
            type={passwordInputType}
            autoComplete="on"
            placeholder="Введите пароль" />
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