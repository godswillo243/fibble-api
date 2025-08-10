"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOUDINARY_CLOUD_NAME = exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.SMTP_PASSWORD = exports.SMTP_EMAIL = exports.JWT_REFRESH_SECRET = exports.JWT_SECRET = exports.MONGODB_URI = exports.PORT = exports.CLIENT_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ quiet: true });
_a = process.env, exports.CLIENT_URL = _a.CLIENT_URL, exports.PORT = _a.PORT, exports.MONGODB_URI = _a.MONGODB_URI, exports.JWT_SECRET = _a.JWT_SECRET, exports.JWT_REFRESH_SECRET = _a.JWT_REFRESH_SECRET, exports.SMTP_EMAIL = _a.SMTP_EMAIL, exports.SMTP_PASSWORD = _a.SMTP_PASSWORD, exports.CLOUDINARY_API_KEY = _a.CLOUDINARY_API_KEY, exports.CLOUDINARY_API_SECRET = _a.CLOUDINARY_API_SECRET, exports.CLOUDINARY_CLOUD_NAME = _a.CLOUDINARY_CLOUD_NAME;
