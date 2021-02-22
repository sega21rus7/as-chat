import { Schema, Document, model } from "mongoose";

interface DialogType extends Document {
  _id: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  companion: Schema.Types.ObjectId;
  lastMessage: Schema.Types.ObjectId;
}

const dialogSchema = new Schema({
  author: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  companion: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: "Message",
  },
}, { timestamps: true });

export default model<DialogType & Document>("Dialog", dialogSchema);