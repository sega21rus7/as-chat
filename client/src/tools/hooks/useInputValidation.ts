/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import { useState, useEffect } from "react";

enum ValidatorsKeys {
  isEmpty = "isEmpty",
  minLen = "minLen",
  maxLen = "maxLen",
  isEmail = "isEmail",
  isPassword = "isPassword",
}

export type ValidatorsType = {
  [ValidatorsKeys.isEmpty]?: boolean;
  [ValidatorsKeys.minLen]?: number;
  [ValidatorsKeys.maxLen]?: number;
  [ValidatorsKeys.isEmail]?: boolean;
  [ValidatorsKeys.isPassword]?: boolean;
}

export default (value: string, validators: ValidatorsType): string => {
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");

    for (const key in validators) {
      if (key === ValidatorsKeys.isEmpty) {
        !value && setError("Поле обязательно для заполнения!");
      }
      if (!value) {
        break;
      }
      if (key === ValidatorsKeys.minLen) {
        validators.minLen && value.length < validators.minLen &&
          setError(`Минимальная допустимая длина ${validators[key]} символов`);
      }
      if (key === ValidatorsKeys.maxLen) {
        validators.maxLen && value.length > validators.maxLen &&
          setError(`Максимальная допустимая длина ${validators[key]} символов`);
      }
      if (key === ValidatorsKeys.isEmail) {
        const ok = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(value);
        if (!ok) {
          setError("Недопустимый e-mail");
        }
      }
      if (key === ValidatorsKeys.isPassword) {
        const ok = /.*[0-9]/.test(value);
        if (!ok) {
          setError("Пароль должен содержать хотя бы одну цифру");
        }
      }
    }
  }, [value, validators]);
  return error;
};  