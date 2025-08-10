import mongoose from "mongoose";

interface Notification {
  user: mongoose.Schema.Types.ObjectId;
  type: "LIKE" | "COMMENT" | "FRIEND_REQUEST";
  referenceId: mongoose.Schema.Types.ObjectId; // post, comment, etc.
  read: boolean;
  message: string;
  createdAt: Date;
}

const notificationSchema = new mongoose.Schema<Notification>({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  type: {
    type: String,
    enum: ["LIKE", "COMMENT", "FRIEND_REQUEST"],
    required: true,
  },
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const NotificationModel = mongoose.model<Notification>(
  "Notification",
  notificationSchema
);
