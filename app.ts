import signupRouter from "./routes/signup";
import loginRouter from "./routes/login";
import { Express } from "express";
import logoutRouter from "./routes/logout";

export const RouteHandler = async (app: Express) => {
  app.use("/api/signup", signupRouter);
  app.use("/api/login", loginRouter);
  app.use("/api/logout", logoutRouter);
};
