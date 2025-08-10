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
exports.createPost = createPost;
exports.getPostFeed = getPostFeed;
exports.deletePost = deletePost;
exports.getUserPosts = getUserPosts;
exports.likeUnlikePost = likeUnlikePost;
exports.getComments = getComments;
exports.getComment = getComment;
exports.addComment = addComment;
exports.deleteComment = deleteComment;
function createPost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            next(error);
        }
    });
}
function getPostFeed(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            res.status(500).json({ error: "Opps! Something went wrong" });
        }
    });
}
function deletePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            res.status(500).json({ error: "Opps! Something went wrong" });
        }
    });
}
function getUserPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            res.status(500).json({ error: "Opps! Something went wrong" });
        }
    });
}
function likeUnlikePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            res.status(500).json({ error: "Opps! Something went wrong" });
        }
    });
}
function getComments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            res.status(500).json({ error: "Opps! Something went wrong" });
        }
    });
}
function getComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            res.status(500).json({ error: "Opps! Something went wrong" });
        }
    });
}
function addComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            res.status(500).json({ error: "Opps! Something went wrong" });
        }
    });
}
function deleteComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            res.status(500).json({ error: "Opps! Something went wrong" });
        }
    });
}
