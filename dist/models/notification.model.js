"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const notificationSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
    type: {
        type: String,
        enum: ["LIKE", "COMMENT", "FRIEND_REQUEST"],
        required: true,
    },
    referenceId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
    message: {
        type: String,
        default: "",
    },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});
exports.NotificationModel = mongoose_1.default.model("Notification", notificationSchema);
