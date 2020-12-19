export interface IUser {
  email: string;
  login: string;
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
}

export interface IEditUserResponse {
  user: IUser,
}