import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegForm: React.FC = () => {
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [repeatPasswordInputType, setRepeatPasswordInputType] = useState("password");
  const [passwordSuffixClassNames, setPasswordSuffixClassNames] = useState([
    "input__password-suffix",
  ]);
  const [repeatPasswordSuffixClassNames, setRepeatPasswordSuffixClassNames] = useState([
    "input__password-suffix",
  ]);

  const switchPasswordVisibility = () => {
    setPasswordInputType(prev => prev === "password" ? "text" : "password");
    if (passwordSuffixClassNames.length === 1) {
      setPasswordSuffixClassNames(prev =>
        [...prev, "input__password-suffix_strikethrough"],
      );
    } else {
      setPasswordSuffixClassNames(prev => [prev[0]]);
    }
  };

  const switchRepeatPasswordVisibility = () => {
    setRepeatPasswordInputType(prev => prev === "password" ? "text" : "password");
    if (repeatPasswordSuffixClassNames.length === 1) {
      setRepeatPasswordSuffixClassNames(prev =>
        [...prev, "input__password-suffix_strikethrough"],
      );
    } else {
      setRepeatPasswordSuffixClassNames(prev => [prev[0]]);
    }
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
            placeholder="Введите логин" />
        </div>
        <div className="input">
          <input className="input__content auth-form__input"
            type="email"
            placeholder="Введите email" />
        </div>
        <div className="input">
          <input className="input__content auth-form__input"
            type={passwordInputType}
            autoComplete="on"
            placeholder="Придумайте пароль" />
          <div className={passwordSuffixClassNames.join(" ")}
            onClick={switchPasswordVisibility}></div>
        </div>
        <div className="input">
          <input className="input__content auth-form__input"
            type={repeatPasswordInputType}
            autoComplete="on"
            placeholder="Повторите пароль" />
          <div className={repeatPasswordSuffixClassNames.join(" ")}
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