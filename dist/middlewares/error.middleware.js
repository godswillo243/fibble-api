"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const jsonwebtoken_1 = require("jsonwebtoken");
function errorMiddleware(error, req, res, next) {
    try {
        console.log(error);
        if (error.name === jsonwebtoken_1.TokenExpiredError.name) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        res.status(500).json({ error: "Opps! Something went wrong" });
    }
    catch (error) {
        res.status(500).json({ error: "Opps! Something went wrong" });
    }
}
