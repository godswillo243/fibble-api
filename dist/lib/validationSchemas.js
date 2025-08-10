"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidationSchema = exports.createUserValidationSchema = void 0;
const zod_1 = require("zod");
exports.createUserValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string("Name is required")
        .min(3, "Name must be at least 3 characters"),
    email: zod_1.z.email("Email is required"),
    username: zod_1.z
        .string("username is required")
        .min(3, "Username must be at least 3 characters"),
    password: zod_1.z
        .string("Password is required")
        .min(6, "Password must be at least 6 characters"),
});
exports.loginValidationSchema = zod_1.z.object({
    emailOrUsername: zod_1.z
        .string("Email or Username is required")
        .nonempty("Email or Username is required"),
    password: zod_1.z
        .string("Password is required")
        .min(6, "Password must be at least 6 characters"),
});
