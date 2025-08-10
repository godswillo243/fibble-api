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
exports.checkAuth = checkAuth;
const utils_1 = require("../lib/utils");
const user_model_1 = require("../models/user.model");
const refreshToken_model_1 = require("../models/refreshToken.model");
function checkAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader)
                return res.status(401).json({ error: "Unauthorized" });
            const token = authHeader.split(" ")[1];
            if (!token)
                return res.status(401).json({ error: "Unauthorized" });
            const userId = (0, utils_1.verifyToken)(token);
            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            const user = yield user_model_1.UserModel.findById(userId);
            const refreshTokenModel = yield refreshToken_model_1.RefreshTokenModel.findOne({ user: userId });
            if (!user)
                return res.status(404).json({ error: "User not found" });
            if (!refreshTokenModel) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            req.user = {
                _id: userId,
            };
            next();
        }
        catch (error) {
            next(error);
        }
    });
}
