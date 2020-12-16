/* eslint-disable @typescript-eslint/no-explicit-any */
import { IObject, IParams } from "./interfaces";

export const customFetch = async (url: string, data?: Record<string, unknown>, params?: IParams): Promise<IObject | string> => {
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
  let res: string | IObject = await response.text();
  try {
    res = JSON.parse(res);
    // eslint-disable-next-line no-empty
  } catch (err) { }
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