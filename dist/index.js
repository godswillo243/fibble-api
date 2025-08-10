"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./config/server");
const env_1 = require("./config/env");
const mongodb_1 = require("./config/mongodb");
const auth_routes_1 = require("./routes/auth.routes");
const error_middleware_1 = require("./middlewares/error.middleware");
const user_routes_1 = require("./routes/user.routes");
server_1.app.use("/api/auth", auth_routes_1.authRoutes);
server_1.app.use("/api/users", user_routes_1.userRoutes);
server_1.app.use(error_middleware_1.errorMiddleware);
server_1.server.listen(env_1.PORT, () => {
    console.log("\x1b[32mServer running on port: " + env_1.PORT);
    (0, mongodb_1.connectMonogDB)()
        .then(() => console.log("connected to mongodb\x1b[37m\n"))
        .catch((err) => console.log(err));
});
