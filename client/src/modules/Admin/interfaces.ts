export interface IUser {
  key: string;
  email: string;
  login: string;
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
}

export interface IDataSourceObj {
  [key: string]: IUser;
}