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
exports.getMe = getMe;
exports.updateMe = updateMe;
exports.getUser = getUser;
exports.searchForUsers = searchForUsers;
exports.getSuggestedUsers = getSuggestedUsers;
exports.getContacts = getContacts;
exports.addContact = addContact;
exports.getContact = getContact;
exports.deleteContact = deleteContact;
exports.blockContact = blockContact;
const user_model_1 = require("../models/user.model");
const cloudinary_1 = require("../lib/cloudinary");
function getMe(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user._id;
            const user = yield user_model_1.UserModel.findById(userId)
                .select("-resetPasswordCode -password -emailVerificationCode")
                .populate("contacts", "name username email avatarUrl");
            if (!user)
                return res.status(404).json({ error: "User not found" });
            res.status(200).json(user);
        }
        catch (error) {
            next(error);
        }
    });
}
function updateMe(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user._id;
            const { username, name, avatar, bio, } = req.body;
            const user = yield user_model_1.UserModel.findById(userId)
                .select("-resetPasswordCode -password -emailVerificationCode")
                .populate("contacts", "name username email avatarUrl");
            if (!user)
                return res.status(404).json({ error: "User not found" });
            if (avatar) {
                const secureUrl = yield (0, cloudinary_1.uploadImage)(avatar);
                user.avatarUrl = secureUrl || user.avatarUrl;
            }
            if (username && username.length < 3)
                return res
                    .status(400)
                    .json({ error: "Username must be at least 3 characters" });
            if (name && name.length < 3)
                return res
                    .status(400)
                    .json({ error: "Username must be at least 3 characters" });
            user.bio = bio || user.bio;
            user.name = name || user.name;
            user.username = username.toLowerCase() || user.username;
            yield user.save();
            res.status(200).json(user);
        }
        catch (error) {
            next(error);
        }
    });
}
function getUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            next(error);
        }
    });
}
function searchForUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            next(error);
        }
    });
}
function getSuggestedUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            next(error);
        }
    });
}
function getContacts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const contacts = yield user_model_1.UserModel.findById(req.user._id)
                .select("contacts")
                .populate("contacts", "username email name avatarUrl");
            if (!contacts)
                return res.status(401).json({ error: "Unauthorized" });
            res.status(200).json(contacts);
        }
        catch (error) {
            next(error);
        }
    });
}
function addContact(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, username, id } = req.body;
            const user = yield user_model_1.UserModel.findById(req.user._id);
            const targetUser = yield user_model_1.UserModel.findOne({
                $or: [
                    {
                        email,
                    },
                    {
                        username: username.toLowerCase(),
                    },
                    {
                        _id: id,
                    },
                ],
            });
            if (!user)
                return res.status(401).json({ error: "Unauthorized" });
            if (!targetUser)
                return res.status(404).json({ error: "User not found" });
            if (user.username === targetUser.username)
                return res
                    .status(404)
                    .json({ error: "Cannot add yourself to your contact" });
            yield user.updateOne({
                $addToSet: {
                    contacts: targetUser._id,
                },
            });
            const contacts = yield user_model_1.UserModel.findById(user._id)
                .select("contacts")
                .populate("contacts", "username email name avatarUrl");
            res.status(200).json(contacts);
        }
        catch (error) {
            next(error);
        }
    });
}
function getContact(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteContact(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, username, id } = req.body;
            const user = yield user_model_1.UserModel.findById(req.user._id);
            const targetUser = yield user_model_1.UserModel.findOne({
                $or: [
                    {
                        email,
                    },
                    {
                        username: username.toLowerCase(),
                    },
                    {
                        _id: id,
                    },
                ],
            });
            if (!user)
                return res.status(401).json({ error: "Unauthorized" });
            if (!targetUser)
                return res.status(404).json({ error: "User not found" });
            yield user.updateOne({
                $pull: {
                    contacts: targetUser._id,
                },
            });
            const contacts = yield user_model_1.UserModel.findById(user._id)
                .select("contacts")
                .populate("contacts", "username email name avatarUrl");
            res.status(200).json(contacts);
        }
        catch (error) {
            next(error);
        }
    });
}
function blockContact(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            next(error);
        }
    });
}
