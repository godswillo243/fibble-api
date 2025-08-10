"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        min: [3, "Name must be at least 3 characters"],
    },
    username: {
        type: String,
        required: true,
        min: [3, "Username must be at least 3 characters"],
        unique: [true, "username already used"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already used"],
    },
    password: {
        type: {
            hash: { type: String, required: true },
            salt: { type: String, required: true },
        },
        required: [true, "Password is required"],
        min: [6, "Password must be at least 6 characters"],
    },
    avatarUrl: { type: String, default: "" },
    bio: { type: String, default: "" },
    contacts: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }],
    emailVerified: { type: Boolean, default: false },
    emailVerificationCode: { type: String, default: "" },
    resetPasswordCode: { type: String, default: "" },
}, { timestamps: true });
exports.UserModel = mongoose_1.default.model("User", userSchema);
