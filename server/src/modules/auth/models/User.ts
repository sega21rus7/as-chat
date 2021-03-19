import { Schema, Document, model } from "mongoose";
import { UserRoles } from "./Role";

export interface IUser extends Document {
  login: string,
  email: string,
  password: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  roles: Array<UserRoles>;
  createdAt: Date;
  updatedAt: Date;
  lastVisited: Date;
}

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  lastName: {
    type: String,
  },
  firstName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
      ref: "Role",
    },
  ],
  lastVisited: {
    type: Date,
    required: true,
    default: new Date(),
  },
}, { timestamps: true });

export default model<IUser & Document>("User", userSchema);