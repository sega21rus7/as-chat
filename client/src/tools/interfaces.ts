export interface IUser {
  roles: string[];
  _id: string;
  email: string;
  login: string;
  createdAt: Date;
  updatedAt: Date;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  avatar?: string;
}
export interface IMessage {
  hasRead: boolean;
  _id: string;
  author: IUser;
  text: string;
  updatedAt: Date;
  dialog: string;
}

export interface IDialog {
  messages: IMessage[],
  _id: string;
  author: IUser;
  companion: IUser;
  updatedAt: Date;
}