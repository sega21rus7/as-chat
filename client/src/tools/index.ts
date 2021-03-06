/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "universal-cookie";
import { UserType } from "./interfaces";

export const jsonFetch = async<T>(url: string, data?: Record<string, unknown>, params?: {
  method?: string;
}): Promise<{
  [key: string]: T
}> => {
  const response = await fetch(url, {
    method: params && params.method ? params.method : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data && JSON.stringify(data),
  });
  if (response.status > 201) {
    const errMessage = await response.text();
    throw new Error(errMessage || "Произошла непредвиденная ошибка.");
  }
  // if (response.headers.get("Content-Type")?.includes("application/json")) {
  const res = await response.json();
  return res;
};

export const arrToObj = (array: any[], key = "_id"): Record<string, any> => {
  if (!array.length) {
    return {};
  }
  let result: any = {};
  array.forEach(item => {
    result[item[key]] = item;
  });
  return result;
};

export const getObjectKeyByValue = (object: any, value: any): string => {
  return Object.keys(object).find(key => object[key] === value) || "";
};

export const removeToken = (): void => {
  const cookies = new Cookies();
  cookies.remove("jwt");
};

export const getToken = (): string => {
  const cookies = new Cookies();
  return cookies.get("jwt") || "";
};

export const getFullName = (user: UserType) => {
  let res = "";
  if (user.firstName || user.lastName || user.middleName) {
    res = `${user.firstName || ""} ${user.lastName || ""}`;
  }
  return res || user.login;
};

