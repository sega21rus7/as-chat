export interface IUser {
  key: string;
  email: string;
  login: string;
  _id: string;
}

export interface IDataSourceObj {
  [key: string]: IUser;
}