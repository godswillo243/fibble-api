import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { CLIENT_URL } from "./env";
import ratelimit from "express-rate-limit";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

app.use(express.json({ limit: "10mb" }));
app.use(
  cors({
    origin: CLIENT_URL,
  })
);

app.use(
  ratelimit({
    limit: 5,
    windowMs: 1000 * 6,
  })
);

export { app, server, io };
