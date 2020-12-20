export interface IParams {
  method?: string;
  token?: string;
}

export interface IObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any | any[];
}

export interface IKeyStringValueString {
  [key: string]: string
}
export interface IUser {
  key: string;
  email: string;
  login: string;
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  avatar?: string;
}