"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
exports.generateRefreshToken = generateRefreshToken;
exports.verifyRefreshToken = verifyRefreshToken;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const refreshToken_model_1 = require("../models/refreshToken.model");
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = crypto_1.default.randomBytes(16).toString("hex");
        const derivedKey = yield new Promise((resolve, reject) => {
            crypto_1.default.scrypt(password, salt, 64, (err, derivedKey) => {
                if (err)
                    reject(err);
                else
                    resolve(derivedKey);
            });
        });
        return { hash: derivedKey.toString("hex"), salt };
    });
}
function verifyPassword(password, hash, salt) {
    return __awaiter(this, void 0, void 0, function* () {
        const derivedKey = yield new Promise((resolve, reject) => {
            crypto_1.default.scrypt(password, salt, 64, (err, key) => {
                if (err)
                    reject(err);
                else
                    resolve(key);
            });
        });
        return crypto_1.default.timingSafeEqual(Buffer.from(hash, "hex"), derivedKey);
    });
}
function generateToken(userId) {
    return jsonwebtoken_1.default.sign({ userId }, env_1.JWT_SECRET, {
        expiresIn: "10M",
    });
}
function verifyToken(token) {
    const decoded = jsonwebtoken_1.default.verify(token, env_1.JWT_SECRET);
    if (!decoded) {
        return null;
    }
    return decoded.userId;
}
function generateRefreshToken(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield refreshToken_model_1.RefreshTokenModel.deleteMany({
            user: userId,
        });
        const token = jsonwebtoken_1.default.sign({ userId }, env_1.JWT_REFRESH_SECRET, {
            expiresIn: "2W",
        });
        yield refreshToken_model_1.RefreshTokenModel.create({
            user: userId,
            token,
        });
        return token;
    });
}
function verifyRefreshToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const refreshTokenObj = yield refreshToken_model_1.RefreshTokenModel.findOne({
            token,
        });
        if (!refreshTokenObj) {
            return null;
        }
        const decoded = jsonwebtoken_1.default.verify(token, env_1.JWT_REFRESH_SECRET);
        if (!decoded) {
            return null;
        }
        return decoded.userId;
    });
}
