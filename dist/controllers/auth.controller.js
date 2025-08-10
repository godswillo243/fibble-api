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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.getAuthUser = getAuthUser;
exports.refreshAccessToken = refreshAccessToken;
exports.logoutUser = logoutUser;
exports.verifyEmail = verifyEmail;
exports.sendResetPasswordEmail = sendResetPasswordEmail;
exports.resetPassword = resetPassword;
const validationSchemas_1 = require("../lib/validationSchemas");
const user_model_1 = require("../models/user.model");
const utils_1 = require("../lib/utils");
const refreshToken_model_1 = require("../models/refreshToken.model");
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = validationSchemas_1.createUserValidationSchema.safeParse(req.body);
            if (result.error) {
                return res.status(400).json({ error: result.error.issues[0].message });
            }
            const { email, name, password, username } = result.data;
            const existingUser = yield user_model_1.UserModel.findOne({
                $or: [
                    {
                        email,
                    },
                    {
                        username,
                    },
                ],
            });
            if (existingUser) {
                return res.status(400).json({
                    error: `${email === existingUser.email
                        ? "Email"
                        : username === existingUser.username
                            ? "username"
                            : "  "} already used`,
                });
            }
            const hpassword = yield (0, utils_1.hashPassword)(password);
            const newUser = new user_model_1.UserModel({
                email,
                name,
                username: username.toLowerCase(),
                password: hpassword,
            });
            yield newUser.save();
            const token = (0, utils_1.generateToken)(newUser._id.toString());
            const refreshToken = yield (0, utils_1.generateRefreshToken)(newUser._id.toString());
            res.status(201).json({ token, refreshToken });
        }
        catch (error) {
            next(error);
        }
    });
}
function loginUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = validationSchemas_1.loginValidationSchema.safeParse(req.body);
            if (!result.success) {
                return res.status(400).json(result.error.issues[0].message);
            }
            const { emailOrUsername, password } = result.data;
            const user = yield user_model_1.UserModel.findOne({
                $or: [
                    {
                        email: emailOrUsername,
                    },
                    {
                        username: emailOrUsername,
                    },
                ],
            });
            if (!user) {
                return res.status(400).json({ error: "Email or username is invalid" });
            }
            const isPasswordMatch = yield (0, utils_1.verifyPassword)(password, user.password.hash, user.password.salt);
            if (!isPasswordMatch) {
                return res.status(400).json({ error: "Invalid password" });
            }
            const token = (0, utils_1.generateToken)(user._id);
            const refreshToken = yield (0, utils_1.generateRefreshToken)(user._id);
            res.status(201).json({ token, refreshToken });
        }
        catch (error) {
            next(error);
        }
    });
}
function getAuthUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user._id;
            const user = yield user_model_1.UserModel.findById(userId).select("-resetPasswordCode -password -emailVerificationCode");
            if (!user)
                return res.status(404).json({ error: "User not found" });
            res.status(200).json(user);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Something went wrong" });
        }
    });
}
function refreshAccessToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader)
                return res.status(401).json({ error: "Unauthorized" });
            const refreshToken = authHeader.split(" ")[1];
            if (!refreshToken)
                return res.status(401).json({ error: "Unauthorized" });
            const userId = yield (0, utils_1.verifyRefreshToken)(refreshToken);
            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            const token = (0, utils_1.generateToken)(userId);
            const newRefreshToken = yield (0, utils_1.generateRefreshToken)(userId);
            return res.status(201).json({ token, refreshToken: newRefreshToken });
        }
        catch (error) {
            next(error);
        }
    });
}
function logoutUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user._id;
            yield refreshToken_model_1.RefreshTokenModel.deleteMany({
                user: userId,
            });
            res.status(200).json("Logged out!");
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Something went wrong" });
        }
    });
}
function verifyEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Something went wrong" });
        }
    });
}
function sendResetPasswordEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Something went wrong" });
        }
    });
}
function resetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Something went wrong" });
        }
    });
}
