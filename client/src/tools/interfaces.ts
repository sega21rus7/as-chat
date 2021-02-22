export interface UserType {
  roles: string[];
  _id?: string;
  email: string;
  login: string;
  createdAt: Date;
  updatedAt: Date;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  avatar?: string;
}