import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useInput } from "tools/hooks";
import InputError from "./InputError";

const RegForm: React.FC = () => {
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [repeatPasswordInputType, setRepeatPasswordInputType] = useState("password");
  const email = useInput("", { isEmpty: true, isEmail: true });
  const login = useInput("", { isEmpty: true, minLen: 5, maxLen: 15 });
  const password = useInput("", { isEmpty: true, minLen: 5, isPassword: true });
  const repeatPassword = useInput("", { isEmpty: true, minLen: 5, isPassword: true });

  const switchPasswordVisibility = () => {
    setPasswordInputType(prev => prev === "password" ? "text" : "password");
  };

  const switchRepeatPasswordVisibility = () => {
    setRepeatPasswordInputType(prev => prev === "password" ? "text" : "password");
  };

  return (
    <form className="auth-form">
      <div className="auth-form__header">
        <h1 className="auth-form__title">Регистрация</h1>
        <p className="auth-form__subtitle">Пожалуйста зарегистрируйтесь</p>
      </div>
      <div className="auth-form__content">
        <div className="input">
          <input className="input__content auth-form__input"
            type="text"
            value={login.value}
            onChange={login.onChange}
            onBlur={login.onBlur}
            placeholder="Введите логин" />
          <InputError value={login} />
        </div>

        <div className="input">
          <input className="input__content auth-form__input"
            type="email"
            value={email.value}
            onChange={email.onChange}
            onBlur={email.onBlur}
            placeholder="Введите e-mail" />
          <InputError value={email} />
        </div>

        <div className="input">
          <input className="input__content auth-form__input"
            type={passwordInputType}
            autoComplete="on"
            value={password.value}
            onChange={password.onChange}
            onBlur={password.onBlur}
            placeholder="Придумайте пароль" />
          <InputError value={password} />
          <div
            className={passwordInputType === "password" ?
              "input__password-suffix" :
              "input__password-suffix input__password-suffix_strikethrough"}
            onClick={switchPasswordVisibility}></div>
        </div>

        <div className="input">
          <input className="input__content auth-form__input"
            type={repeatPasswordInputType}
            autoComplete="on"
            value={repeatPassword.value}
            onChange={repeatPassword.onChange}
            onBlur={repeatPassword.onBlur}
            placeholder="Повторите пароль" />
          <InputError value={repeatPassword} />
          <div
            className={repeatPasswordInputType === "password" ?
              "input__password-suffix" :
              "input__password-suffix input__password-suffix_strikethrough"}
            onClick={switchRepeatPasswordVisibility}></div>
        </div>
        <button className="auth-form__btn"
          type="submit">Зарегистрироваться</button>
        <Link to="/auth" className="auth-form__link">Уже зарегистрированы?</Link>
      </div>
    </form>
  );
};

export default RegForm;