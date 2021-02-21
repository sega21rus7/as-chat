import { Schema, Document, model } from "mongoose";

export enum UserRoles {
  admin = "admin",
  user = "user",
}

interface RoleType extends Document {
  name: UserRoles.admin | UserRoles.user;
}

const roleSchema = new Schema({
  name: {
    type: String,
    default: "user",
    unique: true,
  },
});

export default model<RoleType & Document>("roles", roleSchema);