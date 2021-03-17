/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "universal-cookie";
import { IUser } from "./interfaces";

export const baseFetch = async (url: string, data?: Record<string, unknown>, params?: {
  method?: string;
}) => {
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
  return response;
};

export const textFetch = async (url: string, data?: Record<string, unknown>, params?: {
  method?: string;
}): Promise<string> => {
  const response = await baseFetch(url, data, params);
  const res = await response.text();
  return res;
};

export const jsonFetch = async<T>(url: string, data?: Record<string, unknown>, params?: {
  method?: string;
}): Promise<{
  [key: string]: T
}> => {
  const response = await baseFetch(url, data, params);
  const res = await response.json();
  return res;
};

export const arrToObj = <T>(array: T[] | undefined | null, key = "_id"): Record<string, T> | undefined => {
  if (!array || !array.length) {
    return undefined;
  }
  let result: { [key: string]: T } = {};
  array.forEach(item => {
    result[(item as any)[key]] = item;
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

export const getFullName = (user: IUser) => {
  let res = "";
  if (user.firstName || user.lastName || user.middleName) {
    res = `${user.firstName || ""} ${user.lastName || ""}`;
  }
  return res || user.login;
};

