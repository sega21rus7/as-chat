/* eslint-disable @typescript-eslint/no-explicit-any */
import { IResponse, IParams } from "./interfaces";

interface IObject {
  [key: string]: any;
}

export const customFetch = async (url: string, data?: Record<string, unknown>, params?: IParams): Promise<IResponse> => {
  const response = await fetch(url, {
    method: params && params.method || "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data && JSON.stringify(data),
  });
  if (response.status > 201) {
    const errMessage = await response.text();
    throw new Error(errMessage || "Произошла непредвиденная ошибка.");
  }
  const res = await response.json();
  return res;
};

export const arrToObj = (array: any[], key = "_id"): Record<string, any> => {
  if (!array.length) {
    return {};
  }
  let result: IObject = {};
  array.forEach(item => {
    result[item[key]] = item;
  });
  return result;
};