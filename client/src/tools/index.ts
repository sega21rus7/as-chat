/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "universal-cookie";

export const jsonFetch = async (url: string, data?: Record<string, unknown>, params?: {
  method?: string;
  token?: string;
}): Promise<any> => {
  const authHeader = params?.token && { "Authorization": params.token };
  const response = await fetch(url, {
    method: params && params.method ? params.method : "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
    },
    body: data && JSON.stringify(data),
  });
  if (response.status > 201) {
    const errMessage = await response.text();
    throw new Error(errMessage || "Произошла непредвиденная ошибка.");
  }
  let res: any = await response.text();
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

export const isAuth = (): boolean => {
  const cookies = new Cookies();
  return cookies.get("jwt");
};

