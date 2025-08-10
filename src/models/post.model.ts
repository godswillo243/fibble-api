import mongoose from "mongoose";

interface Post extends mongoose.Document {
  author: mongoose.Schema.Types.ObjectId;
  content: string;
  imageUrl: string;
  likes: mongoose.Schema.Types.ObjectId[]; // array of User._id
  views: mongoose.Schema.Types.ObjectId[]; // array of User._id
  saves: mongoose.Schema.Types.ObjectId[]; // array of User._id
  tags: string[];
}

const postSchema = new mongoose.Schema<Post>(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    views: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    saves: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    tags: {
      type: [String],
    },
  },
  { timestamps: true }
);

export const PostModel = mongoose.model<Post>("Post", postSchema);
