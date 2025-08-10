"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    post: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Post",
    },
    comment: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Comment",
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    likes: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "User",
        required: true,
    },
}, { timestamps: true });
exports.CommentModel = mongoose_1.default.model("Comment", commentSchema);
