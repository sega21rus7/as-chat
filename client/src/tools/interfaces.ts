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
  dialog: string;
  createdAt: Date;
  updatedAt: Date;
}

interface INotPopulatedMessage {
  hasRead: boolean;
  _id: string;
  author: string;
  text: string;
  dialog: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDialog {
  lastMessage: INotPopulatedMessage;
  _id: string;
  author: IUser;
  companion: IUser;
  updatedAt: Date;
  hasNotReadMessagesCount?: number;
}