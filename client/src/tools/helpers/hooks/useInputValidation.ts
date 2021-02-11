/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import { useState, useEffect } from "react";

export type ValidatorsType = {
  isEmpty?: boolean;
  minLen?: number;
  maxLen?: number;
  isEmail?: boolean;
  isPassword?: boolean;
}

export default (value: string, validators: ValidatorsType): string => {
  console.log("!!!!!!!!!!!! USE validation", validators);
  const [error, setError] = useState("");
  useEffect(() => {
    setError("");
    for (const key in validators) {
      switch (key) {
        case "minLen": {
          validators.minLen && value.length < validators.minLen &&
            setError(`Минимальная допустимая длина ${validators[key]} символов`);
          break;
        }
        case "maxLen": {
          validators.maxLen && value.length > validators.maxLen &&
            setError(`Максимальная допустимая длина ${validators[key]} символов`);
          break;
        }
        case "isEmail": {
          const ok = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(value);
          if (!ok) {
            setError("Недопустимый e-mail");
          }
          break;
        }
        case "isPassword": {
          const ok = /.*[0-9]/.test(value);
          if (!ok) {
            setError("Пароль должен содержать хотя бы одну цифру");
          }
          break;
        }
        case "isEmpty": {
          !value && setError("Поле обязательно для заполнения!");
          break;
        }
      }
    }
  }, [value, validators]);
  return error;
};  