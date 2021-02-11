export type ParamsType = {
  method?: string;
  token?: string;
}

export type ObjectType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any | any[];
}

export type KeyValueType = {
  [key: string]: string
}
export type UserType = {
  key: string;
  email: string;
  login: string;
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
}