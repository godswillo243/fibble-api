import { server, app, io } from "./config/server";
import { PORT } from "./config/env";
import { connectMonogDB } from "./config/mongodb";
import { authRoutes } from "./routes/auth.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { userRoutes } from "./routes/user.routes";

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log("\x1b[32mServer running on port: " + PORT);
  connectMonogDB()
    .then(() => console.log("connected to mongodb\x1b[37m\n"))
    .catch((err) => console.log(err));
});
