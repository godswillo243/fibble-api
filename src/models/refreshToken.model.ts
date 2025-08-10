import mongoose from "mongoose";

interface RefreshToken extends mongoose.Document {
  token: string;
  user: mongoose.Schema.Types.ObjectId;
}

const refreshTokenSchema = new mongoose.Schema<RefreshToken>(
  {
    token: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const RefreshTokenModel = mongoose.model<RefreshToken>(
  "Refresh_token",
  refreshTokenSchema
);
