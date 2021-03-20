import { Schema, Document, model } from "mongoose";

interface IDialog extends Document {
  _id: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  companion: Schema.Types.ObjectId;
  lastMessage: Schema.Types.ObjectId;
  hasNotReadMessagesCount?: number;
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
  hasNotReadMessagesCount: {
    type: Number,
    default: 1,
  },
}, { timestamps: true });

export default model<IDialog & Document>("Dialog", dialogSchema);