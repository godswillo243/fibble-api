"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./env");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: env_1.CLIENT_URL,
        methods: ["GET", "POST"],
    },
});
exports.io = io;
app.use(express_1.default.json({ limit: "10mb" }));
app.use((0, cors_1.default)({
    origin: env_1.CLIENT_URL,
}));
app.use((0, express_rate_limit_1.default)({
    limit: 5,
    windowMs: 1000 * 6,
}));
