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
  lastVisited: Date;
}
export interface IMessage {
  hasRead: boolean;
  _id: string;
  author: IUser;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  dialog: string;
}

export interface IDialog {
  lastMessage: IMessage,
  _id: string;
  author: IUser;
  companion: IUser;
  updatedAt: Date;
}