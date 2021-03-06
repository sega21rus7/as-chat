import { Schema, Document, model } from "mongoose";

export enum UserRoles {
  admin = "admin",
  user = "user",
}

interface IRole extends Document {
  name: UserRoles.admin | UserRoles.user;
}

const roleSchema = new Schema({
  name: {
    type: String,
    default: "user",
    unique: true,
  },
}, { timestamps: true });

export default model<IRole & Document>("Role", roleSchema);