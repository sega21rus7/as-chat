import { Rule } from "antd/lib/form";

const requireRules = [
  { required: true, message: "Поле обязательно для заполнения!" },
];

export const passRules = [
  ...requireRules,
  { min: 6, message: "Минимальная длина пароля 6 символов!" },
  { max: 20, message: "Максимальная длина пароля 20 символов!" },
];

export const loginRules = [
  ...requireRules,
  { min: 4, message: "Минимальная длина логина 4 символа!" },
  { max: 20, message: "Максимальная длина логина 20 символов!" },
];

export const emailRules: Rule[] = [
  ...requireRules,
  { type: "email", message: "Введите корректный email!" },
];